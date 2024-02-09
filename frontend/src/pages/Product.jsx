import { useContext } from "react";
import { useLoaderData, json } from "react-router-dom";

import ProductCard from "../components/ProductCard/ProductCard.jsx";
import Reviews from "../components/Reviews/Reviews.jsx";
import AuthContext from "../context/auth-context.jsx";
import Loader from "../components/Loader/Loader.jsx";

const ProductPage = () => {
  const { product } = useLoaderData();
  const authCtx = useContext(AuthContext);

  return (
    <>
      {!product && <Loader />}
      <ProductCard
        id={product.id}
        name={product.name}
        rating={product.rating}
        numReviews={product.ratingCount}
        description={product.description}
        price={product.price}
        countInStock={product.countInStock}
        image={product.imageData}
        imageType={product.imageType}
      />
      <Reviews productId={product.id} ratingCount={product.ratingCount} />
    </>
  );
};

export default ProductPage;

export const loadProduct = async ({ request, params }) => {
  const id = params.productId;

  const response = await fetch(`http://localhost:5000/products/${id}`);

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
