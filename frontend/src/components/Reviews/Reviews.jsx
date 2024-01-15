import { useEffect, useState } from "react";

import styles from "./Reviews.module.css";
import Review from "./Review.jsx";
import WriteAReview from "./WriteAReview.jsx";
import Button from "../Button/Button.jsx";

const Reviews = props => {
  const productId = props.productId;
  const [loadedReviews, setLoadedReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);

      const response = await fetch(
        `http://localhost:5000/products/reviews/${productId}`
      );

      // to do...
      // if (!response.ok) {
      //   throw new Error("Something went wrong!");
      // }

      const responseData = await response.json();

      const fetchedReviews = [];
      responseData.reviews.map(review => fetchedReviews.push(review));

      setLoadedReviews(fetchedReviews);
      setIsLoading(false);
    };

    fetchReviews(productId);
  }, [productId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const showWriteAComment = () => setIsHidden(false);
  const hideWriteAComment = () => setIsHidden(true);

  return (
    <section className={`${styles.wrapper} ${styles["slide-in-left"]}`}>
      <div className={styles["title-wrapper"]}>
        <div className={styles["section-title"]}>User Reviews</div>
        <Button type="button" onClick={showWriteAComment} disabled={!isHidden}>
          + Write your review
        </Button>
      </div>

      <WriteAReview isHidden={isHidden} hideWriteAComment={hideWriteAComment} />
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
  );
};

export default Reviews;
