import React from "react";
import { useAuth } from "../contexts/AuthContext";

export const Dashboard = () => {
  const { currentUser } = useAuth();
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {currentUser?.email}</p>
    </div>
  );
};
