import ReactDOM from "react-dom";

import Button from "../Button/Button.jsx";
import styles from "./LoginMenu.module.css";

const LoginMenu = props => {
  return ReactDOM.createPortal(
    <div className={styles["login-menu"]} onClick={props.onClick}>
      <Button to="/users/login">Login</Button>
      <Button to="/users/register">Register</Button>
    </div>,
    document.getElementById("modal-hook")
  );
};

export default LoginMenu;
