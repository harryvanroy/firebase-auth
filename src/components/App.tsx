import React from "react";
import { Signup } from "./Signup";
import { AuthProvider } from "../contexts/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Signup />
    </AuthProvider>
  );
};

export default App;
