import { useState, useMemo, useEffect } from "react";
import { useLoaderData, Link, json, useNavigate } from "react-router-dom";

import Card from "../components/Card/Card.jsx";
import Pagination from "../components/Pagination/Pagination.jsx";
import styles from "./SearchPage.module.css";

const SearchPage = props => {
  let { products, pageNumber, count, keyword } = useLoaderData();
  const navigate = useNavigate();

  let pageSize = 6;
  const [currentPage, setCurrentPage] = useState(pageNumber);
  const [currentData, setCurrentData] = useState(products);

  const changePage = page => {
    setCurrentPage(page);
    navigate(`/search/?keyword=${keyword}&page=${page}`);
  };

  useEffect(() => {
    setCurrentData(products);
  }, [products]);

  if (products.length > 0) {
    return (
      <>
        <div className={styles["products-container"]}>
          {currentData.map(product => (
            <Link key={product.id} to={`/products/${product.id}`}>
              <Card
                id={product.id}
                name={product.name}
                rating={product.rating}
                numReviews={product.ratingCount}
                price={product.price}
                imageType={product.imageType}
                imageData={product.imageData}
              />
            </Link>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalCount={count}
          pageSize={pageSize}
          onPageChange={page => changePage(page)}
        />
      </>
    );
  } else {
    return <div>Sorry, no products to show!</div>;
  }
};

export default SearchPage;

export const loadSearchedProducts = async ({ request }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page");
  const keyword = url.searchParams.get("keyword")
    ? url.searchParams.get("keyword")
    : "";

  const response = await fetch(
    `http://localhost:5000/products/?keyword=${keyword}&page=${page}`
  );

  if (!response.ok) {
    return json({ message: "Could not fetch events." }, { status: 500 });
  } else {
    const resData = await response.json();

    return resData;
  }
};
