import React, { useState, useContext } from "react";
import { TextField, Button, Box, Typography, Card, CardContent } from "@mui/material";
import { CampaignContext } from "../context/CampaignContext";

const CampaignForm = () => {
    const { addCampaign } = useContext(CampaignContext);
    const [formData, setFormData] = useState({
      name: "",
      description: "",
      targetAudience: "",
      startDate: "",
      endDate: "",
      budget: "",
    });
  
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      addCampaign(formData);
      setFormData({ name: "", description: "", targetAudience: "", startDate: "", endDate: "", budget: "" });
    };

  return (
    <Card sx={{ maxWidth: 500, mx: "auto", mt: 5, p: 2, boxShadow: 3, borderRadius: 3 }}>
    <CardContent>
      <Typography variant="h5" sx={{ textAlign: "center", mb: 2, fontWeight: "bold" }}>
        Create a New Campaign
      </Typography>

      <TextField 
        label="Campaign Name" 
        name="name" 
        value={formData.name} 
        onChange={handleChange} 
        fullWidth 
        margin="normal" 
        variant="outlined" 
      />

      <TextField 
        label="Description" 
        name="description" 
        value={formData.description} 
        onChange={handleChange} 
        fullWidth 
        margin="normal" 
        variant="outlined" 
        multiline 
        rows={3} 
      />

      <TextField 
        label="Target Audience" 
        name="targetAudience" 
        value={formData.targetAudience} 
        onChange={handleChange} 
        fullWidth 
        margin="normal" 
        variant="outlined" 
      />

      <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
        <TextField 
          label="Start Date" 
          name="startDate" 
          type="date" 
          value={formData.startDate} 
          onChange={handleChange} 
          fullWidth 
          InputLabelProps={{ shrink: true }} 
          variant="outlined" 
        />

        <TextField 
          label="End Date" 
          name="endDate" 
          type="date" 
          value={formData.endDate} 
          onChange={handleChange} 
          fullWidth 
          InputLabelProps={{ shrink: true }} 
          variant="outlined" 
        />
      </Box>

      <TextField 
        label="Budget ($)" 
        name="budget" 
        type="number" 
        value={formData.budget} 
        onChange={handleChange} 
        fullWidth 
        margin="normal" 
        variant="outlined" 
      />

      <Button 
        variant="contained" 
        fullWidth 
        sx={{ mt: 2, bgcolor: "#1976d2", "&:hover": { bgcolor: "#125ea4" }, borderRadius: 2 }}
        onClick={handleSubmit}
      >
        Create Campaign
      </Button>
    </CardContent>
  </Card>
  );
};

export default CampaignForm;
