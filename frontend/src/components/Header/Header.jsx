import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

import styles from "./Header.module.css";
import LoginMenu from "../LoginMenu/LoginMenu.jsx";
import Backdrop from "../Backdrop/Backdrop.jsx";
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
        <div className={styles.adminpanel}>
          <NavLink to="admin/users" className={`${styles["admin-link"]}`}>
            Users
          </NavLink>
          <NavLink to="admin/addproduct" className={`${styles["admin-link"]}`}>
            Add Product
          </NavLink>
          <NavLink to="admin/orders" className={styles["admin-link"]}>
            Orders
          </NavLink>
        </div>
        <button className={styles["header-btn"]} onClick={loginModeHandler}>
          Login
        </button>
        <HeaderCartButton onClick={props.onShowCart} />
        {loginMenuIsShown && <LoginMenu onClick={loginModeHandler} />}
        {loginMenuIsShown && <Backdrop onClick={loginModeHandler} dark />}
      </nav>
    </header>
  );
};

export default Header;
