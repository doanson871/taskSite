import React from "react";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../../contexts/authContext";
import Navbar from "../navbar/Navbar";
// import ScrollableFeed from "react-scrollable-feed";

const ProtectedRoute = () => {
  // const {
  //   authState: { authLoading, isAuthenticated },
  // } = useContext(AuthContext);

  // if (authLoading) {
  //   return <></>;
  // }
  return true ? (
    <>
      <Navbar /> <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
