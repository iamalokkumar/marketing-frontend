import React, { useEffect, useState } from "react";
import { getPosts, fetchPostAnalytics } from "../services/api";
import { Box, Typography, Card, CardContent, Grid, Button } from "@mui/material";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const platformIcons = {
  Facebook: <FaFacebook size={20} color="#1877F2" />,
  Twitter: <FaTwitter size={20} color="#1DA1F2" />,
  LinkedIn: <FaLinkedin size={20} color="#0077B5" />,
  Instagram: <FaInstagram size={20} color="#E1306C" />,
};

const SocialMedia = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getPosts();
      setPosts(data);
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ mt: 4, maxWidth: "1000px", mx: "auto" }}>
      <Typography variant="h5" sx={{ textAlign: "center", mb: 3 }}>Post History & Analytics</Typography>

      {posts.length === 0 ? (
        <Typography sx={{ textAlign: "center" }}>No posts found.</Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post._id}>
              <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {platformIcons[post.platform]} {post.platform}
                  </Typography>
                  <Typography>{post.content}</Typography>
                  <Typography variant="caption">Shared on: {new Date(post.createdAt).toLocaleString()}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default SocialMedia;
