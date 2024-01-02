import { useEffect, useState } from "react";

import styles from "./Reviews.module.css";
import Review from "./Review.jsx";
import WriteAReview from "./WriteAReview.jsx";

const Reviews = props => {
  const productId = props.productId;
  const [loadedReviews, setLoadedReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  if (loadedReviews.length === 0) {
    return (
      <div>
        There are still no comments for this product. You can be the first to
        write one!
      </div>
    );
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles["section-title"]}>User Reviews</div>
      {loadedReviews.map(review => {
        return (
          <Review
            key={review.createdAt}
            rating={review.rating}
            title={review.title}
            comment={review.comment}
            createdAt={review.createdAt}
            author={review.user.name}
          />
        );
      })}
      <WriteAReview />
    </section>
  );
};

export default Reviews;
