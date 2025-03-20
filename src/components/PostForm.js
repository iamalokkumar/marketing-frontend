import React, { useState, useContext } from "react";
import { TextField, Button, Select, MenuItem, Box } from "@mui/material";
import { SocialMediaContext } from "../context/SocialMediaContext";

const PostForm = () => {
  const { addPost } = useContext(SocialMediaContext);
  const [formData, setFormData] = useState({ content: "", platform: "", scheduledAt: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    addPost(formData);
  };

  return (
    <Box>
      <TextField label="Post Content" name="content" onChange={handleChange} fullWidth />
      <Select name="platform" onChange={handleChange} fullWidth>
        <MenuItem value="LinkedIn">LinkedIn</MenuItem>
        <MenuItem value="Facebook">Facebook</MenuItem>
        <MenuItem value="Twitter">Twitter</MenuItem>
        <MenuItem value="Instagram">Instagram</MenuItem>
      </Select>
      <TextField label="Schedule At" name="scheduledAt" type="datetime-local" onChange={handleChange} fullWidth />
      <Button onClick={handleSubmit}>Create Post</Button>
    </Box>
  );
};

export default PostForm;
