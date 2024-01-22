import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

import styles from "./Header.module.css";
import LoginMenu from "../LoginMenu/LoginMenu.jsx";
import HeaderCartButton from "./HeaderCartBtn.jsx";

const Header = props => {
  const [loginMenuIsShown, setLoginMenuIsShown] = useState(false);

  let timeout;
  const openLoginMode = () => setLoginMenuIsShown(true);
  const closeLoginMode = () =>
    (timeout = setTimeout(() => setLoginMenuIsShown(false), 1000));
  const suddenClose = () => setLoginMenuIsShown(false);

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
        <button
          className={`${styles["header-btn"]} ${
            loginMenuIsShown ? styles.open : ""
          }`}
          onMouseEnter={
            loginMenuIsShown ? () => clearTimeout(timeout) : openLoginMode
          }
          onMouseLeave={closeLoginMode}
        >
          웃 My account▾
        </button>
        <button className={styles["header-btn"]}>⭐ Favourites</button>
        <HeaderCartButton
          onClick={props.onShowCart}
          className={styles["header-btn"]}
        />
        <div id="login-menu-hook"></div>
        {loginMenuIsShown && (
          <LoginMenu
            onClick={suddenClose}
            onMouseLeave={closeLoginMode}
            onMouseEnter={() => clearTimeout(timeout)}
          />
        )}
        {/* {loginMenuIsShown && <Backdrop onClick={closeLoginMode} dark />} */}
      </nav>
    </header>
  );
};

export default Header;
