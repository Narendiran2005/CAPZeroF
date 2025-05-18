
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  const token = sessionStorage.getItem("token");

  // You can also validate token expiration here if needed

  if (!isLoggedIn || !token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
