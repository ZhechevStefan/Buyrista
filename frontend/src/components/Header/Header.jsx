import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

import AuthContext from "../../context/auth-context.jsx";
import CartContext from "../../context/cart-context.jsx";
import FavContext from "../../context/fav-context.jsx";
import Backdrop from "../Backdrop/Backdrop.jsx";
import Cart from "../Cart/Cart.jsx";
import HeaderCartButton from "./HeaderCartBtn.jsx";
import HeaderButton from "./HeaderBtn.jsx";
import Input from "../Input/Input.jsx";
import LoginMenu from "../LoginMenu/LoginMenu.jsx";
import styles from "./Header.module.css";

const Header = () => {
  const [authMenuIsShown, setAuthMenuIsShown] = useState(false);
  const [cartIsShown, setCartIsShown] = useState(false);

  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  const favCtx = useContext(FavContext);
  let { items } = cartCtx;

  let authMenuBtnName = authCtx.userInfo
    ? `${authCtx.userInfo.name}▾`
    : "웃 My account▾";

  const showCartHandler = () => {
    toast.dismiss();
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  let timeout;
  const openLoginMode = () => setAuthMenuIsShown(true);
  const closeLoginMode = () =>
    (timeout = setTimeout(() => setAuthMenuIsShown(false), 1000));
  const suddenClose = () => setAuthMenuIsShown(false);
  const clearTimer = timeout => clearTimeout(timeout);
  const logout = async () => {
    await fetch("http://localhost:5000/users/logout", {
      method: "POST",
      credentials: "include",
      body: null,
      headers: {
        "Content-Type": "application/json"
      }
    });
    toast.success("See you soon!");
    authCtx.logout();
    cartCtx.clearCart();
    favCtx.clearFavs();
  };

  return (
    <header className={styles["main-wrapper"]}>
      <Link to="/" className={styles.logo}>
        Buyrista
      </Link>
      <div className={styles.search}>
        <input />
      </div>
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
        <HeaderButton
          name={authMenuBtnName}
          isShown={authMenuIsShown}
          close={closeLoginMode}
          open={openLoginMode}
          clear={clearTimer}
        />
        <HeaderButton name={"⭐ Favourites"} />
        <HeaderCartButton onClick={showCartHandler} items={items} />
        {authMenuIsShown && (
          <LoginMenu
            onClick={suddenClose}
            onMouseLeave={closeLoginMode}
            onMouseEnter={() => clearTimeout(timeout)}
            isLogged={!!authCtx.userInfo}
            onLogout={logout}
          />
        )}
        {cartIsShown && <Cart onClose={hideCartHandler} />}
        {cartIsShown && <Backdrop onClick={hideCartHandler} dark />}
        {/* {loginMenuIsShown && <Backdrop onClick={closeLoginMode} dark />} */}
      </nav>
    </header>
  );
};

export default Header;
