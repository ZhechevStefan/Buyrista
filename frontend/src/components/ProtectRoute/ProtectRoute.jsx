import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

import AuthContext from "../../context/auth-context.jsx";

const ProtectedRoute = ({ children }) => {
  //   const authCtx = useContext(AuthContext);
  let storedUser = localStorage.getItem("userInfo");
  let location = useLocation();

  if (!storedUser) {
    // return <Navigate to="/login" state={{ redirected: true }} />;
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  //
  return children;
};

export default ProtectedRoute;
