import React from "react";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { BaseLayout } from "./BaseLayout";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./Dashboard";
import { PrivateRoute } from "./PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<BaseLayout />}>
            <Route
              index
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
