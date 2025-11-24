import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute() {
  const auth = useSelector((state) => state.auth) || {}

  if (!auth.userAuth) {
    return <Navigate to="/login" replace/>;
  }

  return <Outlet />;
}