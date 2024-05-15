import React from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
// import Dashboard from "./pages/Dashboard";

import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./PrivateRoute";

const RoutesPage = () => {
  //   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  //   console.log("authemticated", isAuthenticated);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Dashboard />} />
      </Route>
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
    </Routes>
  );
};

export default RoutesPage;
