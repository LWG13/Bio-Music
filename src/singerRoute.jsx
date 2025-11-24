import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SingerRoute() {
  const auth = useSelector(state => state.auth);

  if (auth.role !== "singer") return <Navigate to="/" replace />;

  return <Outlet />;
}