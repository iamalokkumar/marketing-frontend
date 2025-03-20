import React, { createContext, useState, useEffect } from "react";
import { login, register } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogin = async (formData) => {
    try {
      setError(null);
      const { data } = await login(formData);
      console.log("Login Success:", data); 
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
    } catch (error) {
      console.error("Login Error:", error.response?.data?.message);
      setError("Invalid credentials");
    }
  };

  const handleRegister = async (formData) => {
    try {
      await register(formData);
      alert("Registration successful! Please log in.");
    } catch (error) {
      console.error(error.response.data.message ||  "Registration failed.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleRegister, handleLogout,error  }}>
      {children}
    </AuthContext.Provider>
  );
};
