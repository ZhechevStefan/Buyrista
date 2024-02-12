import { createContext } from "react";

const AuthContext = createContext({
  userInfo: null,
  hasLoggedOut: null,
  login: () => {},
  logout: () => {}
});

export default AuthContext;
