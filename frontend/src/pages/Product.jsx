import { useLoaderData, json } from "react-router-dom";

import ProductCard from "../components/ProductCard/ProductCard.jsx";
import Reviews from "../components/Reviews/Reviews.jsx";

const ProductPage = () => {
  const { product } = useLoaderData();

  return (
    <>
      <ProductCard
        id={product.id}
        name={product.name}
        rating={product.rating}
        numReviews={product.ratingCount}
        description={product.description}
        price={product.price}
        countInStock={product.countInStock}
        imageType={product.imageType}
        imageData={product.imageData}
      />
      <Reviews productId={product.id} />
    </>
  );
};

export default ProductPage;

export const loadProduct = async ({ request, params }) => {
  const id = params.productId;

  const response = await fetch("http://localhost:5000/products/" + id);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected event." },
      {
        status: 500
      }
    );
  } else {
    const resData = await response.json();
    // console.log(resData);
    return resData;
  }
};
