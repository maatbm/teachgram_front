import * as UserTypes from "services/userService/user.types";
import { createContext, useEffect, useState, useContext, useMemo } from "react";
import { UserService } from "services/userService/user.service";
import { setAuthToken } from "services/API";

interface AuthContextType {
  isAuthenticated: boolean;
  signin: (credentials: UserTypes.SignInRequest, rememberMe: boolean) => Promise<void>;
  signout: () => void;
  error: string | null;
  loading: boolean;
}

const localStorageTokenName = "teachgram_jwt";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const tokenString = localStorage.getItem(localStorageTokenName);
      if (tokenString) {
        const parsedToken: UserTypes.JwtTokenResponse = JSON.parse(tokenString);
        if (parsedToken && parsedToken.token && parsedToken.expiration > Date.now()) {
          setAuthToken(parsedToken.type + parsedToken.token);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem(localStorageTokenName);
          setAuthToken(null);
          setIsAuthenticated(false);
        }
      }
    } catch (error) {
      console.error("Error on pre-loading token:", error);
      localStorage.removeItem(localStorageTokenName);
    } finally {
      setLoading(false);
    }
  }, []);

  async function signin(credentials: UserTypes.SignInRequest, rememberMe: boolean) {
    setError(null);
    setLoading(true);
    try {
      const response = await UserService.signin(credentials);
      if ("token" in response) {
        setAuthToken(response.type + response.token);
        setIsAuthenticated(true);
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
      setLoading(false);
    }
  }

  function signout() {
    setAuthToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem(localStorageTokenName);
  }

  const contextValue = useMemo(() => ({
    isAuthenticated,
    signin,
    signout,
    error,
    loading,
  }), [isAuthenticated, signin, signout, error, loading]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
