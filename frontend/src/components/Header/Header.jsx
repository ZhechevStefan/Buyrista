import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

import styles from "./Header.module.css";
import LoginMenu from "../LoginMenu/LoginMenu.jsx";
import Backdrop from "../Backdrop.jsx";
import HeaderCartButton from "./HeaderCartBtn.jsx";

const Header = props => {
  const [isShown, setIsShown] = useState(false);

  const loginModeHandler = () => setIsShown(!isShown);

  return (
    <header className={styles["main-wrapper"]}>
      <Link to="/" className={styles.logo}>
        Buyrista
      </Link>
      <nav className={styles.menus}>
        <button onClick={loginModeHandler}>Login</button>
        <div className={styles.cart}>
          <HeaderCartButton onClick={props.onShowCart} />
        </div>
        {isShown && <LoginMenu onClick={loginModeHandler} />}
        {isShown && <Backdrop onClick={loginModeHandler} />}
      </nav>
    </header>
  );
};

export default Header;
