/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoutes = ({ children }) => {
  const location = useLocation();
  const { token, user } = useSelector((state) => state.auth);
  if (token && user?.role === "admin") {
    return children;
  }
  return <Navigate to="/auth" state={{ from: location }} replace />;
};

export default AdminRoutes;
