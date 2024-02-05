import { createContext } from "react";

const AuthContext = createContext({
  userInfo: null,
  login: () => {},
  logout: () => {},
  checkLogin: () => {}
});

export default AuthContext;
