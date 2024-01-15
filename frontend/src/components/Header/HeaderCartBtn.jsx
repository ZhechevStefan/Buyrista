import { useContext, useEffect } from "react";
import CartIcon from "../Cart/CartIcon.jsx";
import CartContext from "../../context/cart-context.jsx";

const HeaderCartButton = props => {
  const cartCtx = useContext(CartContext);

  let { items } = cartCtx;

  if (items.length === 0) {
    items = JSON.parse(localStorage.getItem("items"));
  }

  const numberOfCartItems = items.reduce((cur, item) => {
    return cur + item.quantity;
  }, 0);

  return (
    <button onClick={props.onClick}>
      <CartIcon numberOfCartItems={numberOfCartItems} />
    </button>
  );
};

export default HeaderCartButton;
