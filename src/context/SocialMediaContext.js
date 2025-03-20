import React, { createContext, useState, useEffect } from "react";
import { createPost, getPosts } from "../services/api";

export const SocialMediaContext = createContext();

export const SocialMediaProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data } = await getPosts();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  };

  const addPost = async (formData) => {
    try {
      const { data } = await createPost(formData);
      setPosts([...posts, data]);
    } catch (error) {
      console.error("Error creating post", error);
    }
  };

  return (
    <SocialMediaContext.Provider value={{ posts, addPost }}>
      {children}
    </SocialMediaContext.Provider>
  );
};
