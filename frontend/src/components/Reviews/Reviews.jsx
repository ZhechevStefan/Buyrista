import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../Button/Button.jsx";
import InfiniteScroll from "../InfiniteScroll/InfiniteScroll.jsx";
import LoginModal from "../Modal/LoginModal.jsx";
import WriteAReview from "./WriteAReview.jsx";
import styles from "./Reviews.module.css";

const Reviews = props => {
  const navigate = useNavigate();
  const productId = props.productId;
  const reviewCount = props.ratingCount;
  const userId = props.userId;
  const userName = props.userName;
  const currUserReview = props.currUserReview;
  const [writeARevewIsHidden, setWriteARevewIsHidden] = useState(true);
  // const [loginIsHidden, setLoginIsHidden] = useState(true);
  const [newReview, setNewReview] = useState(null);

  const showWriteAComment = () => setWriteARevewIsHidden(false);
  const hideWriteAComment = () => setWriteARevewIsHidden(true);

  const goToLogin = () => {
    navigate("../../users/login");
  };

  // const showLogin = () => setLoginIsHidden(false);
  // const hideLogin = () => setLoginIsHidden(true);

  return (
    <>
      <section className={`${styles.wrapper} ${styles["slide-in-left"]}`}>
        <div className={styles["title-wrapper"]}>
          <div className={styles["section-title"]}>User Reviews</div>
          <Button
            type="button"
            onClick={userId ? showWriteAComment : goToLogin}
            disabled={!writeARevewIsHidden}
            withMargins
          >
            {userId
              ? currUserReview
                ? "Edit your review"
                : " + Write your review"
              : "Log in to write reviews"}
          </Button>
        </div>
        {/* {!loginIsHidden && <LoginModal onCancel={hideLogin} />} */}

        <WriteAReview
          productId={productId}
          isHidden={writeARevewIsHidden}
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
