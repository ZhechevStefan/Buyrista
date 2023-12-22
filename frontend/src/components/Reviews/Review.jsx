import styles from "./Review.module.css";
import StarRating from "../StarRating/StarRating.jsx";

const Review = props => {
  const splitCreatedAt = props.createdAt.split("T");
  const date = splitCreatedAt[0];
  const hour = splitCreatedAt[1].split(".")[0];

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <StarRating initialValue={props.rating} readOnly={true} />
        <div className={styles.title}>{props.title}</div>
      </div>
      <div className={styles.author}>by {props.author} </div>
      <div className={styles.date}>
        {date} {hour}
      </div>

      <div>{props.comment}</div>
    </div>
  );
};

export default Review;
