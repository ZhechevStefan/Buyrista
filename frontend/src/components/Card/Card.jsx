import StarRating from "../StarRating/StarRating.jsx";
import styles from "./Card.module.css";

const Card = props => {
  return (
    <div className={styles.wrapper} id={props.id}>
      <div className={styles["img-container"]}>
        <img
          className={styles.img}
          src={`data:${props.imageType};base64, ${props.imageData}`}
          alt={props.name}
        />
      </div>
      <div className={styles.name}>{props.name}</div>
      <div className={styles["reviews-wrapper"]}>
        <StarRating initialValue={props.rating} readOnly={true} />
        <span className={styles.numReviews}>
          {props.numReviews ? props.numReviews : "No"} reviews
        </span>
      </div>
      <div className={styles.price}>
        <p>${props.price}</p>
      </div>
    </div>
  );
};

export default Card;
