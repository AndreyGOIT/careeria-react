import { Navigate } from "react-router-dom";
import type { JSX } from "react";

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredRole: number; // 1 = Admin, 2 = User
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");
  const userAccess = Number(localStorage.getItem("accesslevelId")); // ensure number

  // if not logged in – redirect to home
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // if user role is lower than required – show error
  if (userAccess > requiredRole) {
    // 1 < 1 → Admin only, userAccess(2) > requiredRole(1) → prohibited
    return (
      <h2 style={{ textAlign: "center", marginTop: "2rem", color: "red" }}>
        ❌ You do not have permission to view this page.
      </h2>
    );
  }

  return children;
};

export default ProtectedRoute;
