// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { verifyToken } from "../utils/verifyToken"; // Ensure verifyToken function is properly defined

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const isValid = await verifyToken(token);
          setIsAuthenticated(isValid);
        } catch (error) {
          console.error("Token verification failed:", error);
          setIsAuthenticated(false); // Ensure the state reflects that the token is invalid
        }
      }
    };
    checkToken();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
