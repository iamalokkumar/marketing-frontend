import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("User state updated:", user); // Debugging

    if (user) {
      navigate("/dashboard"); // Redirect to dashboard if user is logged in
    }
  }, [user, navigate]);

  return <AuthForm isLogin={true} />;
};

export default Login;
