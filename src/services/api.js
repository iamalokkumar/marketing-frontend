import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Attach JWT token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  console.log(token)
  if (token) {
    req.headers.Authorization = `Bearer ${token}`; 
  }
  return req;
});

// Auth API
export const login = (formData) => API.post("/auth/login", formData);
export const register = (formData) => API.post("/auth/register", formData);
export const createCampaign = (formData) => API.post("/campaigns", formData);
export const getCampaigns = () => API.get("/campaigns");
export const updateCampaignBudget = (id, budget) => API.put(`/campaigns/${id}/budget`, { budget });
export const launchCampaign = (id) => API.put(`/campaigns/${id}/launch`);
export const createPost = (formData) => API.post("/posts", formData);
export const getPosts = () => API.get("/posts");
export const fetchPostAnalytics = (postId) => API.get(`/posts/${postId}/analytics`);
