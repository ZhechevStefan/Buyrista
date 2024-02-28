import { useContext } from "react";

import CartContext from "../context/cart-context.jsx";
import SummaryCard from "../components/SummaryCard/SummaryCard.jsx";
import styles from "./Summary.module.css";
import Button from "../components/Button/Button.jsx";

const SummaryPage = props => {
  const cartCtx = useContext(CartContext);
  const checkoutValues = props.checkoutValues;
  const totalPrice =
    cartCtx.totalAmount +
    (checkoutValues.paymentMethod === "Card Payment" ? 0 : 2) +
    (cartCtx.totalAmount > 99.99 ? 0 : 10);

  let paymentMessage = null;
  if (checkoutValues.paymentMethod === "Card Payment") {
    paymentMessage =
      "After the order is sent you are gonna be redirected to the payment page.(not really)";
  } else {
    paymentMessage =
      "You are making the payment in the moment you receive your order.";
  }

  const sendOrder = () => {
    checkoutValues.totalPrice = totalPrice.toFixed(2);
    let products = [];
    cartCtx.items.map(item => {
      let current = { id: item.id, quantity: item.quantity, price: item.price };
      products.push(current);
    });
    checkoutValues.products = products;
    console.log(checkoutValues);
  };

  return (
    <div className={styles.summary}>
      <h2>Order Summary</h2>
      <div className={styles["whole-wrapper"]}>
        <div className={styles["card-wrapper"]}>
          <SummaryCard
            title="Delivery"
            content={[
              `${checkoutValues.contactName} - ${checkoutValues.phoneNumber}`,
              `${checkoutValues.country}, ${checkoutValues.postalCode} ${checkoutValues.city}`,
              `${checkoutValues.address}`
            ]}
          />
          <SummaryCard
            title="Billing"
            content={[
              checkoutValues?.billingName || checkoutValues.contactName,
              checkoutValues?.billingAddress ||
                `${checkoutValues.country}, ${checkoutValues.postalCode} ${checkoutValues.city} ${checkoutValues.address}`
            ]}
          />
          <SummaryCard
            title="Payment"
            content={[checkoutValues.paymentMethod, paymentMessage]}
          />
        </div>
        <div className={styles.products}>
          <h3>Your order:</h3>
          <ul>
            {cartCtx.items.map(item => (
              <li key={item.id}>
                <span>{`${item.quantity} X ${item.name}`}</span>
                <span>${(item.quantity * item.price).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className={styles["price-wrapper"]}>
            <div className={styles["price-item"]}>
              <span>Price of all products:</span>{" "}
              <span> ${cartCtx.totalAmount.toFixed(2)}</span>
            </div>
            <div className={styles["price-item"]}>
              <span>Processing fee:</span>{" "}
              <span>
                {checkoutValues.paymentMethod === "Card Payment"
                  ? "$0.00"
                  : "$2.00"}
              </span>
            </div>
            <div className={styles["price-item"]}>
              <span>Delivery fee:</span>{" "}
              <span> {cartCtx.totalAmount > 99.99 ? "$0.00" : "$10.00"}</span>
            </div>
            <div
              className={styles["price-item"]}
              style={{ fontSize: "1.4rem" }}
            >
              <span>Total price:</span> <span> ${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      <Button
        width={"30%"}
        transparent
        onClick={() => props.setIsSummary(false)}
      >
        Edit
      </Button>
      <Button width={"30%"} type="button" onClick={sendOrder}>
        Send Order
      </Button>
    </div>
  );
};

export default SummaryPage;
