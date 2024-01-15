import styles from "./CartItem.module.css";

const CartItem = props => {
  // const price = `$${props.price.toFixed(2)}`;

  const countInStock = props.countInStock;

  return (
    <li className={styles["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={styles.summary}>
          <span className={styles.price}>{props.price}</span>
          <span className={styles.quantity}>x {props.quantity}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd} disabled={!countInStock}>
          +
        </button>
      </div>
    </li>
  );
};

export default CartItem;
