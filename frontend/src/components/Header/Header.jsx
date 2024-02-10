import { useState, useContext, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";

import styles from "./Header.module.css";
import LoginMenu from "../LoginMenu/LoginMenu.jsx";
import HeaderCartButton from "./HeaderCartBtn.jsx";
import AuthContext from "../../context/auth-context.jsx";
import CartContext from "../../context/cart-context.jsx";
import FavContext from "../../context/fav-context.jsx";
import HeaderButton from "./HeaderBtn.jsx";

const Header = props => {
  const [loginMenuIsShown, setLoginMenuIsShown] = useState(false);

  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  const favCtx = useContext(FavContext);

  let loginMenuBtnName = authCtx.userInfo
    ? `${authCtx.userInfo.name}▾`
    : "웃 My account▾";

  let timeout;
  const openLoginMode = () => setLoginMenuIsShown(true);
  const closeLoginMode = () =>
    (timeout = setTimeout(() => setLoginMenuIsShown(false), 1000));
  const suddenClose = () => setLoginMenuIsShown(false);
  const clearTimer = timeout => clearTimeout(timeout);

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
        {/* <button
          className={`${styles["header-btn"]} ${
            loginMenuIsShown ? styles.open : ""
          }`}
          onMouseEnter={
            loginMenuIsShown ? () => clearTimeout(timeout) : openLoginMode
          }
          onMouseLeave={closeLoginMode}
        >
          {authCtx.userInfo ? `${authCtx.userInfo.name}▾` : "웃 My account▾"}
        </button> */}
        <HeaderButton
          name={loginMenuBtnName}
          isShown={loginMenuIsShown}
          close={closeLoginMode}
          open={openLoginMode}
          clear={clearTimer}
        />
        <HeaderButton name={"⭐ Favourites"} />
        <HeaderCartButton onClick={props.onShowCart} />
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
