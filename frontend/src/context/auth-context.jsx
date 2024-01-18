import { createContext } from "react";

const AuthContext = createContext({
  userInfo: null,
  login: () => {},
  logout: () => {}
});

export default AuthContext;
