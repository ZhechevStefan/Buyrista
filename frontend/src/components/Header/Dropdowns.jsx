import { useReducer, useState } from "react";
import { toast } from "react-toastify";

import Backdrop from "../Backdrop/Backdrop.jsx";
import Cart from "../Cart/Cart.jsx";
import HeaderCartButton from "./HeaderCartBtn.jsx";
import HeaderButton from "./HeaderBtn.jsx";
import LoginMenu from "../LoginMenu/LoginMenu.jsx";
import FavsDropdown from "../FavsDropdown/FavsDropdows.jsx";

const defaultState = {
  authMenuIsShown: false,
  favsMenuIsShown: false,
  timeout: null
};

const DropDownReducer = (state, action) => {
  if (action.type === "auth") {
    return { authMenuIsShown: true, favsMenuIsShown: false, timeout: null };
  }
  if (action.type === "favs") {
    return { authMenuIsShown: false, favsMenuIsShown: true, timeout: null };
  }
  if (action.type === "close") {
    return defaultState;
  }

  return defaultState;
};

const Dropdowns = props => {
  const [dropdownState, dispatchDropdownAction] = useReducer(
    DropDownReducer,
    defaultState
  );
  const [cartIsShown, setCartIsShown] = useState(false);
  const { userInfo, items, favs, logout } = props;
  let authMenuBtnName = userInfo ? `${userInfo.name}▾` : "웃 My account▾";

  const showCartHandler = () => {
    toast.dismiss();
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  let timeout = null;
  const openAuthMenu = () => {
    clearTimeout(timeout);
    dispatchDropdownAction({ type: "auth" });
  };

  const openFavsMenu = () => {
    clearTimeout(timeout);
    dispatchDropdownAction({ type: "favs" });
  };

  const closeCurrentDropdown = () => {
    timeout = setTimeout(() => dispatchDropdownAction({ type: "close" }), 800);
  };

  const suddenClose = () => {
    clearTimeout(timeout);
    dispatchDropdownAction({ type: "sudden" });
  };

  return (
    <>
      <div
        onClick={suddenClose}
        onMouseLeave={closeCurrentDropdown}
        onMouseEnter={openAuthMenu}
      >
        <HeaderButton
          name={authMenuBtnName}
          isShown={dropdownState.authMenuIsShown}
        />
        {dropdownState.authMenuIsShown && (
          <LoginMenu isLogged={!!userInfo} onLogout={logout} />
        )}
      </div>
      <div
        // onClick={suddenCloseFavsMenu}
        onMouseLeave={closeCurrentDropdown}
        onMouseEnter={openFavsMenu}
      >
        <HeaderButton name={"⭐ Favourites▾"} />
        {dropdownState.favsMenuIsShown && <FavsDropdown favs={favs} />}
      </div>
      <HeaderCartButton onClick={showCartHandler} items={items} />
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      {cartIsShown && <Backdrop onClick={hideCartHandler} dark />}
      {/* {loginMenuIsShown && <Backdrop onClick={closeLoginMode} dark />} */}
    </>
  );
};

export default Dropdowns;
