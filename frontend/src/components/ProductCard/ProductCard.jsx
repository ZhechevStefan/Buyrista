import { Form } from "react-router-dom";

import styles from "./ProductCard.module.css";
import Button from "../Button/Button.jsx";
import StarRating from "../StarRating/StarRating.jsx";

const ProductCard = props => {
  const { product } = props;

  return (
    <article className={styles["product-wrapper"]}>
      <section className={styles["product-info"]}>
        <div className={styles["image-wrapper"]}>
          <img src={product.image} alt={product.name} />
        </div>
        <div className={styles["info-wrapper"]}>
          <div className={styles.title}>
            <h2>{product.name}</h2>
          </div>
          <div className={styles.rating}>
            <StarRating initialValue={product.rating} readOnly={true} />
            <p>{product.numReviews} reviews</p>
          </div>
          <p className={styles.description}>
            Description: {product.description}
          </p>
        </div>
      </section>
      <Form className={styles["order-info-form"]}>
        <table>
          <tbody>
            <tr>
              <th scope="row">Price:</th>
              <td>${product.price}</td>
            </tr>
            <tr>
              <th scope="row">Status:</th>
              <td>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</td>
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
              <td colSpan={2} style={{ "text-align": "center" }}>
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
