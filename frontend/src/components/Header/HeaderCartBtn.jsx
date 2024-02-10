import { useContext } from "react";
import CartIcon from "../Cart/CartIcon.jsx";
import CartContext from "../../context/cart-context.jsx";

import styles from "./HeaderBtn.module.css";

const HeaderCartButton = props => {
  const cartCtx = useContext(CartContext);

  let { items } = cartCtx;

  const numberOfCartItems = items.reduce((cur, item) => {
    return cur + item.quantity;
  }, 0);

  return (
    <button onClick={props.onClick} className={`${styles["header-btn"]}`}>
      <CartIcon numberOfCartItems={numberOfCartItems} />
    </button>
  );
};

export default HeaderCartButton;
