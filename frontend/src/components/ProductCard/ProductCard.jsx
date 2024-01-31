import { useRef, useState } from "react";

import styles from "./ProductCard.module.css";
import Button from "../Button/Button.jsx";
import Input from "../Input/Input.jsx";
import StarRating from "../StarRating/StarRating.jsx";
import Notifications from "../Notifications/Notifications.jsx";
import { toast } from "react-toastify";

const ProductCard = props => {
  const [quantityIsValid, setQuantityIsValid] = useState(true);
  const quantityInputRef = useRef();

  const submitHandler = event => {
    event.preventDefault();
    toast.success("Product added to Cart!");

    const enteredQuantity = quantityInputRef.current.value;
    const enteredQuantityNumber = +enteredQuantity;

    if (enteredQuantity.trim().length === 0 || enteredQuantityNumber < 1) {
      setQuantityIsValid(false);
      return;
    }

    props.onAddToCart(enteredQuantityNumber);
  };

  return (
    <>
      <article
        className={`${styles["product-wrapper"]} ${styles["slide-in-right"]}`}
      >
        <section className={styles["product-info"]}>
          <div className={styles["image-wrapper"]}>
            <img
              className={styles.img}
              src={`data:${props.imageType};base64, ${props.image}`}
              alt={props.name}
            />
          </div>
          <div className={styles["info-wrapper"]}>
            <div className={styles.title}>
              <h2>{props.name}</h2>
            </div>
            <div className={styles.rating}>
              <StarRating initialValue={props.rating} readOnly={true} />
              <p>{props.numReviews ? props.numReviews : "No"} reviews</p>
            </div>
            <p className={styles.description}>
              Description: {props.description}
            </p>
          </div>
        </section>

        <form className={styles["order-info-form"]} onSubmit={submitHandler}>
          <table>
            <tbody>
              <tr>
                <th scope="row">Price:</th>
                <td>${props.price}</td>
              </tr>
              <tr>
                <th scope="row">Status:</th>
                <td>{props.countInStock ? "In Stock" : "Out of Stock"}</td>
              </tr>
              <tr>
                <th scope="row">Quantity:</th>
                <td>
                  <div className={styles.container}>
                    {props.countInStock ? (
                      <input
                        ref={quantityInputRef}
                        id="quantity"
                        name="quantity"
                        inputMode="numeric"
                        type="number"
                        min={1}
                        max={props.countInStock}
                        defaultValue={1}
                      ></input>
                    ) : (
                      "Out of Stock"
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  <Button
                    type="submit"
                    disabled={!props.countInStock}
                    width="90%"
                  >
                    Add to Cart
                  </Button>
                </td>
              </tr>
              <tr>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  <Button
                    type="submit"
                    disabled={!props.countInStock}
                    width="90%"
                    inverse
                  >
                    Add to Favourites
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
          {!quantityIsValid && <p>Please enter a valid quantity.</p>}
        </form>
      </article>
      <Notifications />
    </>
  );
};

export default ProductCard;
