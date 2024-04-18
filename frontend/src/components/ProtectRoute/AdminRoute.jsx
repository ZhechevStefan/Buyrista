import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

// const AdminRoute = ({ children }) => {
//   useEffect(() => {
//     async function checkCookie() {
//       try {
//         const response = await fetch("http://web.lvh.me/api/users/login/", {
//           credentials: "include"
//         });
//         console.log(response);
//         if (response.ok) {
//           return true;
//         }
//       } catch (err) {
//         return false;
//       }
//     }

//     async function allowAccess() {
//       const isCookieValid = await checkCookie();
//       if (isCookieValid) {
//         return children;
//       } else {
//         throw new Response("Sorry, this page is for admins only!", { stauts: 403 });
//       }
//     }
//     allowAccess();
//   }, []);
// };

const AdminRoute = ({ children }) => {
  let storedUser = localStorage.getItem("userInfo");
  storedUser = JSON.parse(storedUser);
  let location = useLocation();

  if (storedUser && storedUser.isAdmin) {
    return children;
  }

  if (storedUser && !storedUser.isAdmin) {
    toast.error("Sorry, this page is forbidden.");
    return <Navigate to="/" />;
  }

  if (!storedUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default AdminRoute;
