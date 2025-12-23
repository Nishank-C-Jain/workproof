import { createContext, useContext, useEffect, useState } from "react";
import { setToken, getToken, removeToken } from "../utils/token";
import { decodeToken } from "../utils/decodeToken";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      const decoded = decodeToken();
      setUser(true);
      setRole(decoded?.role);
      setUserData(decoded);
    }
    setLoading(false);
  }, []);

  const login = ({ token }) => {
    setToken(token);
    const decoded = decodeToken();
    setUser(true);
    setRole(decoded?.role);
    setUserData(decoded);
  };

  const logout = () => {
    removeToken();
    setUser(null);
    setRole(null);
    setUserData(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        role,
        userData, // id, orgName, etc.
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
