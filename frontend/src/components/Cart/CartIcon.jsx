import styles from "./CartIcon.module.css";

const CartIcon = props => {
  return (
    <span className={styles.icon}>
      <img
        className={`${styles.img} badge`}
        src="/src/assets/icons/shopping-cart.png"
        alt="shopping cart"
      />
      <span
        // className={styles.badge}
        className={props.numberOfCartItems ? styles.badge : styles.invisible}
        // style={props.numberOfCartItems ? "" : { display: "none" }}
      >
        {props.numberOfCartItems}
      </span>
      {/* <span className={styles.badge}>2</span> */}
    </span>
  );
};

export default CartIcon;
