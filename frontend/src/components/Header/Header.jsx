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
import LoginMenu from "../LoginMenu/LoginMenu.jsx";
import SearchInputAutocomplete from "../Input/SearchInputAutocomplete.jsx";
import styles from "./Header.module.css";
import FavsDropdown from "../FavsDropdown/FavsDropdows.jsx";

const Header = () => {
  const [authMenuIsShown, setAuthMenuIsShown] = useState(false);
  const [favsAreShown, setFavsAreShown] = useState(false);
  const [cartIsShown, setCartIsShown] = useState(false);

  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  const favCtx = useContext(FavContext);
  let { items } = cartCtx;
  let { favs } = favCtx;

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
  const openLoginMenu = () => setAuthMenuIsShown(true);
  const closeLoginMenu = () =>
    (timeout = setTimeout(() => setAuthMenuIsShown(false), 800));
  const suddenCloseLoginMenu = () => setAuthMenuIsShown(false);
  const clearTimer = timeout => clearTimeout(timeout);

  let timeout2;
  const openFavsMenu = () => setFavsAreShown(true);
  const closeFavsMenu = () =>
    (timeout2 = setTimeout(() => setFavsAreShown(false), 800));
  const suddenCloseFavsMenu = () => setFavsAreShown(false);

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
      <SearchInputAutocomplete />
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
        <div
          onClick={suddenCloseLoginMenu}
          onMouseLeave={closeLoginMenu}
          onMouseEnter={
            authMenuIsShown ? () => clearTimer(timeout) : openLoginMenu
          }
        >
          <HeaderButton name={authMenuBtnName} isShown={authMenuIsShown} />
          {authMenuIsShown && (
            <LoginMenu isLogged={!!authCtx.userInfo} onLogout={logout} />
          )}
        </div>
        <div
          onClick={suddenCloseFavsMenu}
          onMouseLeave={closeFavsMenu}
          onMouseEnter={
            favsAreShown ? () => clearTimer(timeout2) : openFavsMenu
          }
        >
          <HeaderButton name={"⭐ Favourites▾"} />
          {favsAreShown && <FavsDropdown favs={favs} />}
        </div>
        <HeaderCartButton onClick={showCartHandler} items={items} />
        {cartIsShown && <Cart onClose={hideCartHandler} />}
        {cartIsShown && <Backdrop onClick={hideCartHandler} dark />}
        {/* {loginMenuIsShown && <Backdrop onClick={closeLoginMode} dark />} */}
      </nav>
    </header>
  );
};

export default Header;
