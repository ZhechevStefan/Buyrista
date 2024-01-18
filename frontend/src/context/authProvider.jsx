import { useState, useCallback, useEffect } from "react";

export const AuthProvider = () => {
  const [userInfo, setUserInfo] = useState(null);

  const login = useCallback(profile => {
    setUserInfo(profile);
    localStorage.setItem("userInfo", JSON.stringify(profile));
  }, []);

  const logout = useCallback(() => {
    setUserInfo(null);
    localStorage.removeItem("userInfo");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userInfo"));
    if (storedData) {
      login(storedData);
    }
  }, [login]);

  return { userInfo, login, logout };
};
