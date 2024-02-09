import { useEffect, useState } from "react";

import Button from "../Button/Button.jsx";
import Review from "./Review.jsx";
import WriteAReview from "./WriteAReview.jsx";
import { useHttpClient } from "../../hooks/http-hook.jsx";
import styles from "./Reviews.module.css";
import InfiniteScroll from "../InfiniteScroll/InfiniteScroll.jsx";

const Reviews = props => {
  const productId = props.productId;
  const reviewCount = props.ratingCount;
  const [isHidden, setIsHidden] = useState(true);

  const showWriteAComment = () => setIsHidden(false);
  const hideWriteAComment = () => setIsHidden(true);

  return (
    <>
      <section className={`${styles.wrapper} ${styles["slide-in-left"]}`}>
        <div className={styles["title-wrapper"]}>
          <div className={styles["section-title"]}>User Reviews</div>
          <Button
            type="button"
            onClick={showWriteAComment}
            disabled={!isHidden}
            withMargins
          >
            + Write your review
          </Button>
        </div>

        <WriteAReview
          productId
          isHidden={isHidden}
          hideWriteAComment={hideWriteAComment}
        />
        <InfiniteScroll
          url={`http://localhost:5000/reviews/${productId}`}
          reviewCount={reviewCount}
        />
      </section>
    </>
  );
};

export default Reviews;
