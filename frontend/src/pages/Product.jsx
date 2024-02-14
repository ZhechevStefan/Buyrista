import { useContext } from "react";
import { useLoaderData, json } from "react-router-dom";

import ProductCard from "../components/ProductCard/ProductCard.jsx";
import Reviews from "../components/Reviews/Reviews.jsx";
import AuthContext from "../context/auth-context.jsx";
import Loader from "../components/Loader/Loader.jsx";

const ProductPage = () => {
  const { product } = useLoaderData();
  const authCtx = useContext(AuthContext);
  const userId = authCtx.userInfo ? authCtx.userInfo.id : null;
  const userName = authCtx.userInfo ? authCtx.userInfo.name : null;
  const currUserReview = product.currUserReview ? product.currUserReview : null;

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
        userId={userId}
      />
      <Reviews
        productId={product.id}
        ratingCount={product.ratingCount}
        userId={userId}
        userName={userName}
        currUserReview={currUserReview}
      />
    </>
  );
};

export default ProductPage;

export const loadProduct = async ({ request, params }) => {
  const id = params.productId;
  const userId = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")).id
    : null;

  const address = userId
    ? `http://localhost:5000/products/${id}?user=${userId}`
    : `http://localhost:5000/products/${id}`;
  const response = await fetch(address);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected product." },
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
