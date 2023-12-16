import { useLoaderData, json } from "react-router-dom";

// import styles from "./Product.module.css";
import ProductCard from "../components/ProductCard/ProductCard.jsx";

const ProductPage = () => {
  const { product } = useLoaderData();

  return (
    <ProductCard
      id={product.id}
      name={product.name}
      rating={product.rating}
      numReviews={product.numReviews}
      price={product.price}
      imageType={product.imageType}
      imageData={product.imageData}
    />
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
    console.log(resData);
    return resData;
  }
};
