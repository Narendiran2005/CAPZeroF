// components/AuthRedirect.tsx
import { Navigate } from "react-router-dom";

const AuthRedirect = ({ children }: { children: JSX.Element }) => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  const token = sessionStorage.getItem("token");

  if (isLoggedIn && token) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default AuthRedirect;
