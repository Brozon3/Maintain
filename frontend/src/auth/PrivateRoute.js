import { Navigate, Outlet } from "react-router-dom";
import { UseUser } from "./useUser";

export const PrivateRoute = ({ redirectPath = "/loginPage", children }) => {
  const user = UseUser();

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
