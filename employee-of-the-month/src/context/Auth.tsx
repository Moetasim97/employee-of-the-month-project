import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../types/User";
interface AuthContextState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextState | undefined>(undefined);

const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const login = (user: User) => {
    setUser(user);
    navigate("/");
  };
  const logout = () => {
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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

export default AuthProvider;
