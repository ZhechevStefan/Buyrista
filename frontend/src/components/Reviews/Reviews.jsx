import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../Button/Button.jsx";
import WriteAReview from "./WriteAReview.jsx";
import styles from "./Reviews.module.css";
import InfiniteScroll from "../InfiniteScroll/InfiniteScroll.jsx";

const Reviews = props => {
  const navigate = useNavigate();
  const productId = props.productId;
  const reviewCount = props.ratingCount;
  const userId = props.userId;
  const currUserReview = props.currUserReview;
  const [isHidden, setIsHidden] = useState(true);

  const showWriteAComment = () => setIsHidden(false);
  const hideWriteAComment = () => setIsHidden(true);

  const goToLogin = () => {
    navigate("../../users/login");
  };

  return (
    <>
      <section className={`${styles.wrapper} ${styles["slide-in-left"]}`}>
        <div className={styles["title-wrapper"]}>
          <div className={styles["section-title"]}>User Reviews</div>
          <Button
            type="button"
            onClick={userId ? showWriteAComment : goToLogin}
            disabled={!isHidden}
            withMargins
          >
            {userId
              ? currUserReview
                ? "Edit your review"
                : " + Write your review"
              : "Log in to write reviews"}
          </Button>
        </div>

        <WriteAReview
          productId={productId}
          isHidden={isHidden}
          hideWriteAComment={hideWriteAComment}
          currUserReview={currUserReview}
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
