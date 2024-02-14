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
  const userName = props.userName;
  const currUserReview = props.currUserReview;
  const [isHidden, setIsHidden] = useState(true);
  const [newReview, setNewReview] = useState(null);

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
          setNewReview={setNewReview}
          userName={userName}
        />
        <InfiniteScroll
          url={`http://localhost:5000/reviews/${productId}`}
          reviewCount={reviewCount}
          newReview={newReview}
          setNewReview={setNewReview}
          hideWriteAComment={hideWriteAComment}
        />
      </section>
    </>
  );
};

export default Reviews;
