import CartIcon from "../Cart/CartIcon.jsx";

import styles from "./HeaderBtn.module.css";

const HeaderCartButton = props => {
  const numberOfCartItems = props.items.reduce((cur, item) => {
    return cur + item.quantity;
  }, 0);

  return (
    <button onClick={props.onClick} className={`${styles["header-btn"]}`}>
      <CartIcon numberOfCartItems={numberOfCartItems} />
    </button>
  );
};

export default HeaderCartButton;
