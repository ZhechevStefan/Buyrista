import { useState, useEffect, useRef, useCallback } from "react";

import Review from "../Reviews/Review.jsx";
import styles from "./InfiniteScroll.module.css";
import Loader from "../Loader/Loader.jsx";

const InfiniteScroll = props => {
  const url = props.url;
  const totalReviewCount = props.reviewCount;

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef(null);
  const allReviewsAreLoaded = totalReviewCount == items.length;

  const fetchData = useCallback(async () => {
    if (isLoading || allReviewsAreLoaded) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${url}?page=${page}`);
      const { reviews } = await response.json();

      setItems(prevItems => [...prevItems, ...reviews]);
    } catch (err) {
      console.log(err);
    }

    setPage(prevPage => prevPage + 1);
    setIsLoading(false);
  }, [isLoading, page, url, allReviewsAreLoaded]);

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`${url}?page=1`);
        const { reviews } = await response.json();

        setItems(prevItems => [...prevItems, ...reviews]);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };

    fetchInitialData();
  }, [url]);

  useEffect(() => {
    const reference = loaderRef.current;
    const observer = new IntersectionObserver(entries => {
      const target = entries[0];
      if (target.isIntersecting) {
        fetchData();
      }
    });

    if (reference) {
      observer.observe(reference);
    }

    return () => {
      if (reference) {
        observer.unobserve(reference);
      }
    };
  }, [fetchData]);

  return (
    <>
      {items.length === 0 ? (
        <div className={styles["no-comments-message"]}>
          There are still no reviews for this product. You can be the first to
          write one!
        </div>
      ) : (
        items.map(review => {
          return (
            <Review
              key={review.id}
              rating={review.rating}
              title={review.title}
              comment={review.comment}
              createdAt={review.createdAt}
              author={review.name}
            />
          );
        })
      )}
      <div ref={loaderRef}>{isLoading && <Loader />}</div>
    </>
  );
};

export default InfiniteScroll;
