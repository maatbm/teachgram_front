import { createContext, useEffect, useContext, useMemo, useCallback, useReducer } from "react";
import * as UserTypes from "services/userService/user.types";
import { UserService } from "services/userService/user.service";
import { setAuthToken } from "services/API";
import { useNavigate } from "react-router-dom";
import { Loading } from "components";

interface AuthState {
  isAuthenticated: boolean;
  user: UserTypes.UserResponse | null;
  error: string | null;
  loading: boolean;
}

interface AuthContextType extends AuthState {
  signin: (credentials: UserTypes.SignInRequest, rememberMe: boolean) => Promise<void>;
  signout: () => void;
}

const localStorageTokenName = "teachgram_jwt";

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
  loading: true,
};

type Action =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: UserTypes.UserResponse }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'INITIAL_AUTH_FINISHED' };

const authReducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, loading: false, isAuthenticated: true, user: action.payload, error: null };
    case 'LOGIN_FAILURE':
      return { ...state, loading: false, isAuthenticated: false, user: null, error: action.payload };
    case 'LOGOUT':
      return { ...initialState, loading: false };
    case 'INITIAL_AUTH_FINISHED':
      return { ...state, loading: false };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  const signout = useCallback(() => {
    setAuthToken(null);
    localStorage.removeItem(localStorageTokenName);
    dispatch({ type: 'LOGOUT' });
  }, []);

  const signin = useCallback(async (credentials: UserTypes.SignInRequest, rememberMe: boolean) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const tokenResponse = await UserService.signin(credentials);
      if ("token" in tokenResponse) {
        const fullToken = tokenResponse.type + tokenResponse.token;
        setAuthToken(fullToken);
        if (rememberMe) {
          localStorage.setItem(localStorageTokenName, JSON.stringify(tokenResponse));
        }
        const userProfile = await UserService.getAuthenticatedUserProfile();
        if ("id" in userProfile) {
          dispatch({ type: 'LOGIN_SUCCESS', payload: userProfile });
        } else {
          throw new Error(userProfile.message || "Failed to fetch user profile after sign in.");
        }
      } else {
        throw new Error(tokenResponse.message || "An error occurred during sign-in.");
      }
    } catch (err: any) {
      dispatch({ type: 'LOGIN_FAILURE', payload: err.message || "An unknown error occurred." });
    }
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      const tokenString = localStorage.getItem(localStorageTokenName);
      if (!tokenString) {
        dispatch({ type: 'INITIAL_AUTH_FINISHED' });
        return;
      }
      try {
        const parsedToken: UserTypes.JwtTokenResponse = JSON.parse(tokenString);
        const isTokenValid = parsedToken?.token && parsedToken.expiration > Date.now();
        if (isTokenValid) {
          setAuthToken(parsedToken.type + parsedToken.token);
          const userProfile = await UserService.getAuthenticatedUserProfile();
          if ("id" in userProfile) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: userProfile });
            return;
          }
        }
      } catch (error) {
        console.error("Failed to initialize auth from token:", error);
      }
      signout();
    };

    initializeAuth();
  }, [signout]);

  useEffect(() => {
    const handleUnauthorized = () => {
      signout();
      navigate("/signin");
    };
    window.addEventListener('unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('unauthorized', handleUnauthorized);
    };
  }, [navigate, signout]);

  const contextValue = useMemo(() => ({
    ...state,
    signin,
    signout,
  }), [state, signin, signout]);

  return (
    <AuthContext.Provider value={contextValue}>
      {state.loading ? <Loading fixed={true} /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};