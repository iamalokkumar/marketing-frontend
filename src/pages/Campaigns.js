import React, { useContext, useState } from "react";
import { CampaignContext } from "../context/CampaignContext";
import { Button, Typography, TextField, Box, Grid, Card, CardContent, IconButton } from "@mui/material";
import CampaignForm from "../components/CampaignForm";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa"; 
import { createPost } from "../services/api";
const Campaigns = () => {
  const { campaigns, modifyBudget, launch } = useContext(CampaignContext);
  const [newBudget, setNewBudget] = useState({});
  const handleBudgetChange = (id, value) => {
    setNewBudget({ ...newBudget, [id]: value });
  };

  const handleBudgetUpdate = (id) => {
    if (newBudget[id]) {
      modifyBudget(id, newBudget[id]); // ✅ Update budget
    }
  };
  const shareOnSocialMedia = async (platform) => {
    const postContent = `🚀 Check out our latest marketing campaign!`;

    // ✅ Save the post before sharing
    try {
      await createPost({ content: postContent, platform });
    } catch (error) {
      console.error("Error saving post:", error);
    }

    // ✅ Redirect user to share
    let url = "";
    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(document.location.href)}&quote=${encodeURIComponent(postContent)}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(postContent)}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(document.location.href)}`;
        break;
      case "instagram":
        alert("Instagram does not support direct sharing via URL. Please copy and paste the content manually.");
        return;
      default:
        return;
    }

    window.open(url, "_blank");
  };
  return (
    <Box sx={{ textAlign: "center", p: 3, maxWidth: "1000px", mx: "auto" }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Marketing Campaigns
      </Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
          <IconButton onClick={() => shareOnSocialMedia("facebook")} color="primary">
            <FaFacebook size={24} />
          </IconButton>
          <IconButton onClick={() => shareOnSocialMedia("twitter")} sx={{ color: "#1DA1F2" }}>
            <FaTwitter size={24} />
          </IconButton>
          <IconButton onClick={() => shareOnSocialMedia("linkedin")} sx={{ color: "#0077B5" }}>
            <FaLinkedin size={24} />
          </IconButton>
          <IconButton onClick={() => shareOnSocialMedia("instagram")} sx={{ color: "#E1306C" }}>
            <FaInstagram size={24} />
          </IconButton>
        </Box>
      <CampaignForm />

      <Typography variant="h5" sx={{ mt: 4, fontWeight: "bold" }}>
        Existing Campaigns
      </Typography>

      {/* Campaigns List */}
      {campaigns.length === 0 ? (
        <Typography sx={{ mt: 2 }}>No campaigns found.</Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
          {campaigns.map((c) => (
            <Grid item xs={12} sm={6} md={6} key={c._id}>
              <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
                <CardContent sx={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {c.name}
                  </Typography>
                  <Typography>Budget: <strong>${c.budget}</strong></Typography>

                  {/* Modify Budget */}
                  <TextField
                    type="number"
                    value={newBudget[c._id] || ""}
                    onChange={(e) => handleBudgetChange(c._id, e.target.value)}
                    placeholder="New Budget"
                    size="small"
                    sx={{ width: "80%", textAlign: "center" }}
                  />

                  {/* Buttons */}
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                      variant="contained"
                      onClick={() => handleBudgetUpdate(c._id)}
                      size="small"
                      sx={{ minWidth: 120 }}
                    >
                      Update Budget
                    </Button>

                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => launch(c._id)}
                      disabled={c.isLaunched}
                      size="small"
                      sx={{ minWidth: 120 }}
                    >
                      {c.isLaunched ? "Launched" : "Launch Campaign"}
                    </Button>
                  </Box>
                 
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Campaigns;
