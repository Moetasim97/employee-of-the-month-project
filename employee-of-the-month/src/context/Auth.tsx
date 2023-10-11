import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../types/User";
interface AuthContextState {
  user: User | null;
  login: (userId: number) => Promise<void>;
  logout: () => void;
  loadUserData: () => Promise<void>;
}
const AuthContext = createContext<AuthContextState | undefined>(undefined);

const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const loadUserData = async () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const userResponse = await fetch(
        `http://127.0.0.1:8000/return_employee/${userId}/`
      );
      const user: User = await userResponse.json();
      setUser(user);
    }
  };
  const login = async (userId: number) => {
    localStorage.setItem("userId", userId.toString());
    await loadUserData();
    navigate("/");
  };
  const logout = () => {
    localStorage.removeItem("userId");
    setUser(null);
  };
  useEffect(() => {
    loadUserData();
  }, []);
  return (
    <AuthContext.Provider value={{ user, login, logout, loadUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuthState = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within an AuthProvider");
  }
  return context;
};
export const useAuthLoggedInUser = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useAuthState must be used within an AuthProvider or user is not defined"
    );
  }
  if (!context.user) {
    throw new Error(" user is not defined");
  }
  return context.user;
};

export default AuthProvider;
