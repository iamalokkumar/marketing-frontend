import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import SocialMedia from "./pages/SocialMedia";
import { CampaignProvider } from "./context/CampaignContext";
import { SocialMediaProvider } from "./context/SocialMediaContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Campaigns from "./pages/Campaigns";
import Register from "./pages/Register";

const PrivateRoute = ({ children }) => {
  const { user } = React.useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
    <CampaignProvider>
      <SocialMediaProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/campaigns" element={<PrivateRoute><Campaigns /></PrivateRoute>} />
          <Route path="/social-media" element={<PrivateRoute><SocialMedia /></PrivateRoute>} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
      </SocialMediaProvider>
      </CampaignProvider>
    </AuthProvider>
  );
};

export default App;
