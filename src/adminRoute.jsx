import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminRoute() {
  const auth = useSelector(state => state.auth);

  if (auth.role !== "admin") return <Navigate to="/" replace />;

  return <Outlet />;
}