import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthState } from "../components/UserAuthContext";

function PublicRoute({ children, redirectTo }) {
  const { isAuthenticated } = useAuthState();
  console.log(`AuthenticatedRoute: ${isAuthenticated}`);
  if (isAuthenticated) {
    console.log("Error: User already logged in. Logout and try again.");
    return <Navigate to={redirectTo}/>
  }
  return children;
}

export default PublicRoute;