import ReactDOM from "react-dom";

import Button from "../Button/Button.jsx";
import styles from "./LoginMenu.module.css";

const LoginMenu = props => {
  // return ReactDOM.createPortal(
  const isLogged = props.isLogged;
  return (
    <div
      className={styles["login-menu"]}
      onMouseLeave={props.onMouseLeave}
      onMouseEnter={props.onMouseEnter}
    >
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
            <Button to="/users/login" width="110px" withMargins>
              Login
            </Button>
            <Button to="/users/register" width="110px" withMargins>
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
