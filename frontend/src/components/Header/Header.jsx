import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

import styles from "./Header.module.css";
import LoginMenu from "../LoginMenu/LoginMenu.jsx";
import Backdrop from "../Backdrop.jsx";
import HeaderCartButton from "./HeaderCartBtn.jsx";

const Header = props => {
  const [loginMenuIsShown, setLoginMenuIsShown] = useState(false);

  const loginModeHandler = () => setLoginMenuIsShown(!loginMenuIsShown);

  return (
    <header className={styles["main-wrapper"]}>
      <Link to="/" className={styles.logo}>
        Buyrista
      </Link>
      <nav className={styles.menus}>
        <button className={styles["header-btn"]} onClick={loginModeHandler}>
          Login
        </button>
        <HeaderCartButton onClick={props.onShowCart} />
        {loginMenuIsShown && <LoginMenu onClick={loginModeHandler} />}
        {loginMenuIsShown && <Backdrop onClick={loginModeHandler} />}
      </nav>
    </header>
  );
};

export default Header;
