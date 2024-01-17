import ReactDOM from "react-dom";

import Button from "../Button/Button.jsx";
import styles from "./LoginMenu.module.css";

const LoginMenu = props => {
  return ReactDOM.createPortal(
    <div
      className={styles["login-menu"]}
      onClick={props.onClick}
      onMouseLeave={props.onMouseLeave}
      onMouseEnter={props.onMouseEnter}
    >
      <div className={styles["message"]}>
        Log in to your account to use the advantages!
      </div>
      <div className={styles["button-container"]}>
        <Button to="/users/login">Login</Button>
        <Button to="/users/register">Register</Button>
      </div>
    </div>,
    // document.getElementById("modal-hook")
    document.getElementById("login-menu-hook")
  );
};

export default LoginMenu;
