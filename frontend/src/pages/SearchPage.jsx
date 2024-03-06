import { useState, useMemo } from "react";
import { useLoaderData, Link } from "react-router-dom";

import Card from "../components/Card/Card.jsx";
import Pagination from "../components/Pagination/Pagination.jsx";

const SearchPage = props => {
  const { products } = useLoaderData();
  let pageSize = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return products.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, pageSize, products]);

  if (products.length > 0) {
    return (
      <div>
        {products.map(product => (
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
        <Pagination
          currentPage={currentPage}
          totalCount={products.length}
          pageSize={pageSize}
          onPageChange={page => setCurrentPage(page)}
        />
      </div>
    );
  } else {
    return <div>Sorry, no products to show!</div>;
  }
};

export default SearchPage;
