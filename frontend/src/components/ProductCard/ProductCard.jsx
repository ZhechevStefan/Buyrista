import { Form } from "react-router-dom";

import styles from "./ProductCard.module.css";
import Button from "../Button/Button.jsx";
import StarRating from "../StarRating/StarRating.jsx";

const ProductCard = props => {
  return (
    <article className={styles["product-wrapper"]}>
      <section className={styles["product-info"]}>
        <div className={styles["image-wrapper"]}>
          <img
            className={styles.img}
            src={`data:${props.imageType};base64, ${props.imageData}`}
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
          <p className={styles.description}>Description: {props.description}</p>
        </div>
      </section>
      <Form className={styles["order-info-form"]}>
        <table>
          <tbody>
            <tr>
              <th scope="row">Price:</th>
              <td>${props.price}</td>
            </tr>
            <tr>
              <th scope="row">Status:</th>
              <td>{props.countInStock > 0 ? "In Stock" : "Out of Stock"}</td>
            </tr>
            <tr>
              <th scope="row">Quantity:</th>
              <td>
                <input
                  type="text"
                  inputMode="numeric"
                  id="quantity"
                  name="quantity"
                ></input>
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ textAlign: "center" }}>
                <Button>Add to Cart</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </Form>
    </article>
  );
};

export default ProductCard;
