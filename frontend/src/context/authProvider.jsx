import { useState, useCallback, useEffect } from "react";
import AuthContext from "./auth-context.jsx";

const AuthProvider = props => {
  const [userInfo, setUserInfo] = useState(null);
  const [hasLoggedOut, setHasLoggedOut] = useState(null);

  const login = useCallback(profile => {
    setUserInfo(profile);
    localStorage.setItem("userInfo", JSON.stringify(profile));
  }, []);

  const logout = useCallback(() => {
    setUserInfo(null);
    localStorage.clear();
  }, []);

  const authContext = {
    userInfo,
    hasLoggedOut,
    login,
    logout
  };

  useEffect(() => {
    async function checkCookie() {
      try {
        const response = await fetch("http://localhost:5000/users/login/", {
          credentials: "include"
        });

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
          let user = JSON.parse(storedData);
          setUserInfo(user);
          setHasLoggedOut(false);
        } else {
          logout();
          setHasLoggedOut(true);
        }
      } else {
        setHasLoggedOut(false);
      }
    }

    setProfile();
  }, [logout]);

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
