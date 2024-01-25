import { usePagination } from "../../hooks/pagination-hook.jsx";
import styles from "./Pagination.module.css";

const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingsCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingsCount,
    pageSize
  });

  const DOTS = "...";

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={`${styles["pagination-container"]} ${className} `}>
      {/* Left navigation arrow */}
      <li
        className={`${styles["pagination-item"]} ${
          currentPage === 1 ? styles.disabled : ""
        }`}
        onClick={onPrevious}
      >
        <div className={`${styles.arrow} ${styles.left}`} />
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li
              className={`${styles["pagination-item"]} ${styles.dots}`}
              key={index}
            >
              &#8230;
            </li>
          );
        }

        return (
          <li
            className={`${styles["pagination-item"]} ${
              pageNumber === currentPage ? styles["selected"] : ""
            }`}
            onClick={() => onPageChange(pageNumber)}
            key={index}
          >
            {pageNumber}
          </li>
        );
      })}
      {/* Right Navigation arrow  */}
      <li
        className={`${styles["pagination-item"]} ${
          currentPage === lastPage ? styles.disabled : ""
        }`}
        onClick={onNext}
      >
        <div className={`${styles.arrow} ${styles.right}`} />
      </li>
    </ul>
  );
};

export default Pagination;
