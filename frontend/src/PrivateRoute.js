import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  return localStorage.getItem("token") ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
