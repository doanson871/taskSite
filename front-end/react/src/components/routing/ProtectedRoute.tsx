import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../../contexts/authContext";
import Navbar from "../navbar/Navbar";

const ProtectedRoute: React.FC = () => {
  const {
    authState: { isAuthenticated },
  } = useContext(AuthContext);
  return isAuthenticated ? (
    <>
      <Navbar /> <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
