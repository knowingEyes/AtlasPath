import { Navigate, Outlet } from "react-router-dom";
import { useIsNew } from "../hooks/useIsNew";
export const ProtectedRoute = () => {
  const { isNew } = useIsNew();
  return isNew ? <Navigate to="/welcome" /> : <Outlet />;
};
