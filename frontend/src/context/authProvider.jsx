import { useState, useCallback, useEffect } from "react";
import AuthContext from "./auth-context.jsx";
import { toast } from "react-toastify";

const AuthProvider = props => {
  const [userInfo, setUserInfo] = useState(null);

  const login = useCallback(profile => {
    setUserInfo(profile);
    localStorage.setItem("userInfo", JSON.stringify(profile));
    // toast.success(`Wellcome, ${profile.name}!`);
  }, []);

  const logout = useCallback(() => {
    // const user = JSON.parse(localStorage.getItem("userInfo"));
    // toast.success(`See you soon, ${user.name}!`);
    setUserInfo(null);
    localStorage.clear();
  }, []);

  const isItLogged = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/users/login/", {
        credentials: "include"
      });

      if (!response.ok) {
        return false;
      }

      return true;
    } catch (err) {
      return false;
    }
  }, []);

  const authContext = {
    userInfo,
    login,
    logout,
    isItLogged
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
