import { Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import PrivateRoute from "./PrivateRoute";
import React from "react";
import Signup from "./pages/Signup";
import { useSelector } from "react-redux";

// import Dashboard from "./pages/Dashboard";

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
