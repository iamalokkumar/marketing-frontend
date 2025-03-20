import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button, Typography } from "@mui/material";

const Dashboard = () => {
  const { user, handleLogout } = useContext(AuthContext);

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <Typography variant="h4">Welcome, {user?.name}!</Typography>
      <Typography variant="h6">Role: {user?.role}</Typography>
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Dashboard;
