import * as UserTypes from "services/userService/user.types";
import { createContext, useEffect, useState, useContext, useMemo, useCallback } from "react";
import { UserService } from "services/userService/user.service";
import { setAuthToken } from "services/API";
import { useNavigate } from "react-router-dom";
import { Loading } from "components";

interface AuthContextType {
  isAuthenticated: boolean;
  signin: (credentials: UserTypes.SignInRequest, rememberMe: boolean) => Promise<void>;
  signout: () => void;
  error: string | null;
  loading: boolean;
  user: UserTypes.UserResponse | null;
}

const localStorageTokenName = "teachgram_jwt";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserTypes.UserResponse | null>(null);
  const navigate = useNavigate();

  const getUser = useCallback(async () => {
    try {
      const response = await UserService.getAuthenticatedUserProfile();
      if ("id" in response) {
        setIsAuthenticated(true);
        setUser(response);
      } else {
        setIsAuthenticated(false);
        setUser(null);
        setError(response.message);
      }
    } catch (err) {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []); 

  const signout = useCallback(() => {
    setAuthToken(null);
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem(localStorageTokenName);
  }, []);

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

  useEffect(() => {
    const initializeAuth = async () => {
      const tokenString = localStorage.getItem(localStorageTokenName);
      if (tokenString) {
        try {
          const parsedToken: UserTypes.JwtTokenResponse = JSON.parse(tokenString);
          if (parsedToken?.token && parsedToken.expiration > Date.now()) {
            setAuthToken(parsedToken.type + parsedToken.token);
            await getUser();
          } else {
            localStorage.removeItem(localStorageTokenName);
          }
        } catch (error) {
          console.error("Error on pre-loading token:", error);
          localStorage.removeItem(localStorageTokenName);
        }
      }
      setLoading(false);
    };
    initializeAuth();
  }, [getUser]);

  const signin = useCallback(async (credentials: UserTypes.SignInRequest, rememberMe: boolean) => {
    setError(null);
    setLoading(true);
    try {
      const response = await UserService.signin(credentials);
      if ("token" in response) {
        setAuthToken(response.type + response.token);
        await getUser();
        if (rememberMe) {
          localStorage.setItem(localStorageTokenName, JSON.stringify(response));
        }
      } else {
        setError(response.message || "An error occurred during sign-in.");
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      setError("An error occurred during sign-in. Please try again.");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [getUser]);

  const contextValue = useMemo(() => ({
    isAuthenticated,
    signin,
    signout,
    error,
    loading,
    user
  }), [isAuthenticated, signin, signout, error, loading, user]);

  return (
    <AuthContext.Provider value={contextValue}>
      {loading ? <Loading fixed={true}/>: children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
