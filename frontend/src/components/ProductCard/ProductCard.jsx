import { useRef, useState, useContext } from "react";
import { toast } from "react-toastify";

import FavContext from "../../context/fav-context.jsx";
import CartContext from "../../context/cart-context.jsx";
import styles from "./ProductCard.module.css";
import Button from "../Button/Button.jsx";
import StarRating from "../StarRating/StarRating.jsx";
import Notifications from "../Notifications/Notifications.jsx";

const ProductCard = props => {
  const cartCtx = useContext(CartContext);
  const [quantityIsValid, setQuantityIsValid] = useState(true);
  const quantityInputRef = useRef();

  const favCtx = useContext(FavContext);
  const isItFav = favCtx.checkIfFav(props.id);

  const addToCartHandler = event => {
    event.preventDefault();

    const enteredQuantity = quantityInputRef.current.value;
    const enteredQuantityNum = +enteredQuantity;

    if (enteredQuantity.trim().length === 0 || enteredQuantityNum < 1) {
      setQuantityIsValid(false);
      return;
    }

    setQuantityIsValid(true);
    toast.success("Product added to Cart!");

    cartCtx.addItem({
      id: props.id,
      name: props.name,
      quantity: enteredQuantityNum,
      countInStock: props.countInStock - 1,
      price: props.price,
      image: props.image,
      imageType: props.imageType
    });
  };

  const addOrRemFavHandler = event => {
    event.preventDefault();
    if (isItFav) {
      favCtx.removeFav(props.id);
      toast.success("Removed from Favourites!");
    } else {
      favCtx.addFav({
        id: props.id,
        name: props.name,
        countInStock: props.countInStock,
        price: props.price,
        image: props.image,
        imageType: props.imageType
      });
      toast.success("Added to Favourites!");
    }
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

        <form className={styles["order-info-form"]}>
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
                    onClick={addToCartHandler}
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
                    onClick={addOrRemFavHandler}
                  >
                    {isItFav ? "Added to Favourites" : "Add to Favourites"}
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
          {!quantityIsValid && (
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "red", fontSize: "0.8rem" }}>
                Please enter a valid quantity.
              </p>
            </div>
          )}
        </form>
      </article>
      <Notifications />
    </>
  );
};

export default ProductCard;
