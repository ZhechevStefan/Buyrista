import { useState, useCallback, useEffect } from "react";
import AuthContext from "./auth-context.jsx";
import { toast } from "react-toastify";

const AuthProvider = props => {
  const [userInfo, setUserInfo] = useState(null);
  // const [cookieIsValid, setCookieIsValid] = useState(null);

  const login = useCallback(profile => {
    setUserInfo(profile);
    localStorage.setItem("userInfo", JSON.stringify(profile));
    // toast.success(`Wellcome, ${profile.name}!`);
  }, []);

  const logout = useCallback(() => {
    // const user = JSON.parse(localStorage.getItem("userInfo"));
    // toast.success(`See you soon, ${user.name}!`);
    console.log("-----here-----");
    setUserInfo(null);
    localStorage.clear();
  }, []);

  const authContext = {
    userInfo,
    login,
    logout
  };

  useEffect(() => {
    async function checkCookie() {
      try {
        const response = await fetch("http://localhost:5000/users/login/", {
          credentials: "include"
        });

        console.log(response.ok);

        if (response.ok) {
          return true;
        }
      } catch (err) {
        return false;
      }
    }

    async function setProfile() {
      let storedData = localStorage.getItem("userInfo");
      if (storedData) {
        const isCookieValid = await checkCookie();

        if (isCookieValid) {
          let user = JSON.parse(localStorage.getItem("userInfo"));
          setUserInfo(user);
          // login(user);
        } else {
          logout();
        }
      }
    }

    setProfile();
  }, [login, logout]);

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
