import { useState, useEffect, useContext } from "react";

import CartContext from "../../context/cart-context.jsx";
import styles from "./CartIcon.module.css";

const CartIcon = props => {
  const [iconIsHighlighted, setIconIsHighlighted] = useState(false);
  // const cartCtx = useContext(CartContext);

  useEffect(() => {
    if (props.numberOfCartItems === 0) {
      return;
    }
    setIconIsHighlighted(true);
    const timer = setTimeout(() => {
      setIconIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [props.numberOfCartItems]);

  // if (numberOfCartItems > 0) {
  //   setIconIsHighlighted(true);
  // }

  return (
    <span className={`${styles.icon} ${iconIsHighlighted ? styles.bump : ""}`}>
      <img
        className={`${styles.img}`}
        src="/src/assets/icons/shopping-cart.png"
        alt="shopping cart"
      />
      <span className={styles.label}>My cart</span>
      <span
        className={props.numberOfCartItems ? styles.badge : styles.invisible}
      >
        {props.numberOfCartItems}
      </span>
    </span>
  );
};

export default CartIcon;
