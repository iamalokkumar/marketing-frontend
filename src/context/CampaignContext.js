import React, { createContext, useState, useEffect } from "react";
import { createCampaign, getCampaigns, updateCampaignBudget, launchCampaign } from "../services/api";

export const CampaignContext = createContext();

export const CampaignProvider = ({ children }) => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const { data } = await getCampaigns();
      setCampaigns(data);
    } catch (error) {
      console.error("Error fetching campaigns", error);
    }
  };

  const addCampaign = async (formData) => {
    try {
      const { data } = await createCampaign(formData);
      setCampaigns([...campaigns, data]);
    } catch (error) {
      console.error("Error creating campaign", error);
    }
  };

  const modifyBudget = async (id, budget) => {
    try {
      const { data } = await updateCampaignBudget(id, budget);
      setCampaigns(campaigns.map((c) => (c._id === id ? data : c)));
    } catch (error) {
      console.error("Error updating budget", error);
    }
  };

  const launch = async (id) => {
    try {
      const { data } = await launchCampaign(id);
      setCampaigns(campaigns.map((c) => (c._id === id ? data : c)));
    } catch (error) {
      console.error("Error launching campaign", error);
    }
  };

  return (
    <CampaignContext.Provider value={{ campaigns, addCampaign, modifyBudget, launch }}>
      {children}
    </CampaignContext.Provider>
  );
};
