import ReactDOM from "react-dom";

import Button from "../Button/Button.jsx";
import styles from "./LoginMenu.module.css";

const LoginMenu = props => {
  return ReactDOM.createPortal(
    <div
      className={styles["login-menu"]}
      onMouseLeave={props.onMouseLeave}
      onMouseEnter={props.onMouseEnter}
    >
      <div className={styles["message"]}>
        Log in to your account to use the advantages!
      </div>
      <div className={styles["button-container"]} onClick={props.onClick}>
        <Button to="/users/login" width="110px" withMargins>
          Login
        </Button>
        <Button to="/users/register" width="110px" withMargins>
          Register
        </Button>
      </div>
    </div>,
    // document.getElementById("modal-hook")
    document.getElementById("login-menu-hook")
  );
};

export default LoginMenu;
