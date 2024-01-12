import { useContext, useState } from "react";
import Modal from "../Modal/Modal.jsx";
import CartItem from "./CartItem.jsx";
import styles from "./Cart.module.css";
import CartContext from "../../context/cart-context.jsx";
import Button from "../Button/Button.jsx";
// import Checkout from "./Checkout.jsx";

const Cart = props => {
  // const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = item => {
    cartCtx.addItem({ ...item, quantity: 1 });
  };

  const orderHandler = () => {
    console.log("isCheckedOut");
    // setIsCheckout(true);
  };

  // const submitOrderHandler = async userData => {
  //   setIsSubmitting(true);
  //   await fetch(
  //     "https://react-http-29e9b-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
  //     {
  //       method: "POST",
  //       body: JSON.stringify({
  //         user: userData,
  //         orderedItems: cartCtx.items
  //       })
  //     }
  //   );
  //   setIsSubmitting(false);
  //   setDidSubmit(true);
  //   cartCtx.clearCart();
  // };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map(item => (
        <CartItem
          key={item.id}
          name={item.name}
          quantity={item.quantity}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={styles.actions}>
      <Button type="button" neutral onClick={props.onClose}>
        Close
      </Button>
      {hasItems && (
        <Button type="button" onClick={orderHandler}>
          Order
        </Button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {hasItems ? (
        cartItems
      ) : (
        <h4 className={styles["empty-basket"]}>
          You have no items in your basket.
        </h4>
      )}
      <div className={styles.total}>
        <span>Total Amount:</span>
        <span>{totalAmount}</span>
      </div>
      {/* {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )} */}
      {modalActions}
    </>
  );

  const isSubmittingModal = <p>Sending order data...</p>;

  const didSubmitModal = <p>Successfull order!</p>;

  return (
    <Modal onClose={props.onClose} header="Your cart:">
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModal}
      {!isSubmitting && didSubmit && didSubmitModal}
    </Modal>
  );
};

export default Cart;
