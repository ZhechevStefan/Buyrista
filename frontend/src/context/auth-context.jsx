import { createContext } from "react";

const AuthContext = createContext({
  userInfo: null,
  login: () => {},
  logout: () => {},
  isItLogged: () => {}
});

export default AuthContext;
