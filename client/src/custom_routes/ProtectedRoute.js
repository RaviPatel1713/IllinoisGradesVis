import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthState } from "../components/UserAuthContext";
// const ProtectedRoute = ({ children }) => {
//   const user = useUserAuth();

//   console.log("Check user in Private: ", user);
//   // if (!user) {
//   //   return <Navigate to="/login" replace />;
//   // }
//   // return children;
//   return typeof user === 'undefined' ? (
//     <Login />
//   ) : user ? (
//     <Outlet />
//   ) : (
//     <Login />
//   );
// };

function ProtectedRoute({ children, redirectTo }) {
  const { isAuthenticated } = useAuthState();
  console.log(`AuthenticatedRoute: ${isAuthenticated}`);
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

export default ProtectedRoute;