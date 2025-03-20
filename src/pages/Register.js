import React, { useState, useContext } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { handleRegister } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister(formData);
    navigate("/login"); // Redirect to login after successful registration
  };

  return (
    <Box sx={{ width: 300, margin: "auto", mt: 5, p: 3, boxShadow: 3, textAlign: "center" }}>
      <Typography variant="h5">Register</Typography>
      <TextField fullWidth margin="normal" name="name" label="Name" onChange={handleChange} />
      <TextField fullWidth margin="normal" name="email" label="Email" onChange={handleChange} />
      <TextField fullWidth margin="normal" name="password" label="Password" type="password" onChange={handleChange} />
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>Register</Button>
    </Box>
  );
};

export default Register;
