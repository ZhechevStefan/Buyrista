import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

import AuthContext from "../../context/auth-context.jsx";
import CartContext from "../../context/cart-context.jsx";
import FavContext from "../../context/fav-context.jsx";
import Dropdowns from "./Dropdowns.jsx";
import SearchInputAutocomplete from "../Input/SearchInputAutocomplete.jsx";
import styles from "./Header.module.css";

const Header = () => {
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  const favCtx = useContext(FavContext);
  const userInfo = authCtx.userInfo;
  let { items } = cartCtx;
  let { favs } = favCtx;

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
        <Dropdowns
          userInfo={userInfo}
          items={items}
          favs={favs}
          logout={logout}
        />
      </nav>
    </header>
  );
};

export default Header;
