import { createContext } from "react";

const AuthContext = createContext({
  userInfo: null,
  // cookieIsValid: null,
  login: () => {},
  logout: () => {}
});

export default AuthContext;
