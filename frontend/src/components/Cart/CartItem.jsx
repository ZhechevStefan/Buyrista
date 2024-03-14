import Button from "../Button/Button.jsx";
import styles from "./CartItem.module.css";

const CartItem = props => {
  const countInStock = props.countInStock;

  return (
    <li className={styles["cart-item"]}>
      <div className={styles["product-info"]}>
        <span className={styles["image-wrapper"]}>
          <img
            className={styles.img}
            src={`data:${props.imageType};base64, ${props.image}`}
            alt={props.name}
          />
        </span>
        <h3 className={styles["product-name"]}>{props.name}</h3>
      </div>
      <div className={styles.summary}>
        <span className={styles.price}>${props.price}</span>
        <span className={styles.quantity}>x {props.quantity}</span>
      </div>
      <div className={styles.actions}>
        <Button onClick={props.onRemove} width="2.5rem">
          -
        </Button>
        <Button onClick={props.onAdd} width="2.5rem" disabled={!countInStock}>
          +
        </Button>
      </div>
    </li>
  );
};

export default CartItem;
