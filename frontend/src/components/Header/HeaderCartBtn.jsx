import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon.jsx";
import CartContext from "../../context/cart-context.jsx";
import styles from "./HeaderCartBtn.module.css";

const HeaderCartButton = props => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((cur, item) => {
    return cur + item.amount;
  }, 0);

  const btnClasses = `${styles.button} ${btnIsHighlighted ? styles.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon val={numberOfCartItems} />
        <span className={styles.badge}>{numberOfCartItems}</span>
      </span>
    </button>
  );
};

export default HeaderCartButton;
