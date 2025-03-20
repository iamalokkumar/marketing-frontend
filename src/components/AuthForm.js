import React, { useState, useContext } from "react";
import { TextField, Button, Typography, Box, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const AuthForm = ({ isLogin }) => {
  const { handleLogin, handleRegister,error  } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [open, setOpen] = useState(false);
  const navigate=useNavigate()
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(formData);
    if (error) setOpen(true);
  };

  return (
    <Box sx={{ width: 300, margin: "auto", mt: 5, p: 3, boxShadow: 3, textAlign: "center" }}>
    <Typography variant="h5">{isLogin ? "Login" : "Register"}</Typography>
    {!isLogin && <TextField fullWidth margin="normal" name="name" label="Name" onChange={handleChange} />}
    <TextField fullWidth margin="normal" name="email" label="Email" onChange={handleChange} />
    <TextField fullWidth margin="normal" name="password" label="Password" type="password" onChange={handleChange} />
    <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>{isLogin ? "Login" : "Register"}</Button>

    {/* Show Popup if User Not Found */}
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>User Not Found</DialogTitle>
      <DialogContent>
        <Typography>{error}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => navigate("/register")} color="primary">Go to Register</Button>
        <Button onClick={() => setOpen(false)} color="secondary">Close</Button>
      </DialogActions>
    </Dialog>
  </Box>
  );
};

export default AuthForm;
