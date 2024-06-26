import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../context/auth-context.jsx";
import CartContext from "../../context/cart-context.jsx";
import Button from "../Button/Button.jsx";
import CartItem from "./CartItem.jsx";
import Modal from "../Modal/Modal.jsx";
import { useHttpClient } from "../../hooks/http-hook.jsx";
import styles from "./Cart.module.css";

const Cart = props => {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = id => {
    const qtyInCart = cartCtx.checkQty(id);
    cartCtx.removeItem(id);

    if (authCtx.userInfo && qtyInCart > 1) {
      const productsIdsAndCount = [{ id, count: -1 }];
      fetch(`${import.meta.env.VITE_BACKEND_URL}/users/cart`, {
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify({ productsIdsAndCount }),
        headers: {
          "Content-Type": "application/json"
        }
      });
    } else if (authCtx.userInfo && qtyInCart === 1) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/users/cart/${id}`, {
        method: "DELETE",
        credentials: "include"
      });
    }
  };

  const cartItemAddHandler = item => {
    cartCtx.addItem({ ...item, quantity: 1 });
    const productsIdsAndCount = [{ id: item.id, count: 1 }];

    if (authCtx.userInfo) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/users/cart`, {
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify({ productsIdsAndCount }),
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
  };

  const orderHandler = () => {
    props.onClose();
    navigate("/checkout");
  };

  return (
    <>
      <Modal onClose={props.onClose} header="Your cart:">
        <>
          {hasItems ? (
            <ul className={styles["cart-items"]}>
              {cartCtx.items.map(item => (
                <CartItem
                  key={item.id}
                  name={item.name}
                  quantity={item.quantity}
                  price={item.price}
                  countInStock={item.countInStock}
                  image={item.image}
                  imageType={item.imageType}
                  onRemove={cartItemRemoveHandler.bind(null, item.id)}
                  onAdd={cartItemAddHandler.bind(null, item)}
                />
              ))}
            </ul>
          ) : (
            <h4 className={styles["empty-basket"]}>You have no items in your basket.</h4>
          )}
          <div className={styles.total}>
            <span>Total Amount:</span>
            <span>{hasItems ? totalAmount : "$0.00"}</span>
          </div>
          <div className={styles.actions}>
            <Button type="button" transparent onClick={props.onClose} withMargins>
              Close
            </Button>
            {hasItems && (
              <Button type="button" onClick={orderHandler} withMargins>
                Order
              </Button>
            )}
          </div>
        </>
      </Modal>
    </>
  );
};

export default Cart;
