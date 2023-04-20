import { Navigate, Outlet } from "react-router-dom";

const RedirectIfLoggedIn = ({ children, isLoggedIn, redirectPath = "/" }) => {
  if (isLoggedIn) {
    return <Navigate to={redirectPath} />;
  }
  return children ? children : <Outlet />;
};

export default RedirectIfLoggedIn;
