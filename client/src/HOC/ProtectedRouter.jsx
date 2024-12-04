import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRouter({ children, isAllowed, redirect }) {
  if (!isAllowed) return <Navigate to={redirect} replace />;
  return children || <Outlet />;
}
