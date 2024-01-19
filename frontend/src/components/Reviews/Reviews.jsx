import { useEffect, useState } from "react";

import Button from "../Button/Button.jsx";
import Review from "./Review.jsx";
import WriteAReview from "./WriteAReview.jsx";
import { useHttpClient } from "../../hooks/http-hook.jsx";
import styles from "./Reviews.module.css";

const Reviews = props => {
  const productId = props.productId;
  const [loadedReviews, setLoadedReviews] = useState([]);
  const [isHidden, setIsHidden] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/products/reviews/${productId}`
        );
        const fetchedReviews = [];
        responseData.reviews.map(review => fetchedReviews.push(review));

        setLoadedReviews(fetchedReviews);
      } catch (err) {
        console.log(err);
      }
    };

    fetchReviews(productId);
  }, [productId, sendRequest]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An unexpected error occurred!</div>;
  }

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
          >
            + Write your review
          </Button>
        </div>

        <WriteAReview
          isHidden={isHidden}
          hideWriteAComment={hideWriteAComment}
        />
        {loadedReviews.length === 0 ? (
          <div className={styles["no-comments-message"]}>
            There are still no reviews for this product. You can be the first to
            write one!
          </div>
        ) : (
          loadedReviews.map(review => {
            return (
              <Review
                key={review.id}
                rating={review.rating}
                title={review.title}
                comment={review.comment}
                createdAt={review.createdAt}
                author={review.user.name}
              />
            );
          })
        )}
      </section>
    </>
  );
};

export default Reviews;
