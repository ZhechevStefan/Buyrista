import { useEffect } from "react";

const AdminRoute = ({ children }) => {
  useEffect(() => {
    async function checkCookie() {
      try {
        const response = await fetch("http://web.lvh.me/api/users/login/", {
          credentials: "include"
        });
        console.log(response);
        if (response.ok) {
          return true;
        }
      } catch (err) {
        return false;
      }
    }

    async function allowAccess() {
      const isCookieValid = await checkCookie();
      if (isCookieValid) {
        return children;
      } else {
        throw new Response("Sorry, this page is for admins only!", { stauts: 403 });
      }
    }
    allowAccess();
  }, []);
};

export default AdminRoute;
