import { useLocation } from "react-router-dom";

import Button from "../Button/Button.jsx";
import styles from "./LoginMenu.module.css";

const LoginMenu = props => {
  // return ReactDOM.createPortal(
  const isLogged = props.isLogged;
  const location = useLocation();

  return (
    <div className={styles["login-menu"]}>
      {/* <div className={styles.triangle}></div> */}
      {isLogged ? (
        <div className={styles["message"]}>Hello!</div>
      ) : (
        <div className={styles["message"]}>
          Log in to your account to use the advantages!
        </div>
      )}
      <div className={styles["button-container"]} onClick={props.onClick}>
        {isLogged ? (
          <Button type="button" width="200px" onClick={props.onLogout}>
            Logout
          </Button>
        ) : (
          <>
            <Button
              to="/login"
              state={{ from: location }}
              width="110px"
              withMargins
            >
              Login
            </Button>
            <Button
              to="/register"
              state={{ from: location }}
              width="110px"
              withMargins
            >
              Register
            </Button>
          </>
        )}
      </div>
    </div>
  );
  // document.getElementById("modal-hook")
  //   document.getElementById("login-menu-hook")
  // );
};

export default LoginMenu;
