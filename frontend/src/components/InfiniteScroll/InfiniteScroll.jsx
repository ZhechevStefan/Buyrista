import { useState, useEffect, useRef, useCallback } from "react";

import { useHttpClient } from "../../hooks/http-hook.jsx";
import Review from "../Reviews/Review.jsx";
import styles from "./InfiniteScroll.module.css";

const InfiniteScroll = props => {
  const url = props.url;
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const fetchData = useCallback(async () => {
    if (isLoading) {
      return;
    }
    try {
      const { reviews } = await sendRequest(`${url}?page=${page}`);

      setItems(prevItems => [...prevItems, ...reviews]);
      setPage(prevPage => prevPage + 1);
    } catch (err) {
      console.log(err);
    }
  }, [isLoading, page, sendRequest, url]);

  const fetchStopper1 = useRef(true);

  useEffect(() => {
    if (fetchStopper1.current) {
      fetchData();
      return () => {
        fetchStopper1.current = false;
      };
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        fetchData();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
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
    </>
  );
};

export default InfiniteScroll;
