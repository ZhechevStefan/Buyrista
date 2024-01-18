import { useContext } from "react";
import { useLoaderData, json } from "react-router-dom";

import ProductCard from "../components/ProductCard/ProductCard.jsx";
import Reviews from "../components/Reviews/Reviews.jsx";
import CartContext from "../context/cart-context.jsx";

const ProductPage = () => {
  const { product } = useLoaderData();
  const cartCtx = useContext(CartContext);

  const onAddToCartHandler = quantity => {
    cartCtx.addItem({
      id: product.id,
      name: product.name,
      quantity: quantity,
      countInStock: product.countInStock - 1,
      price: product.price,
      image: product.imageData,
      imageType: product.imageType
    });
  };

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
        image={product.imageData}
        imageType={product.imageType}
        onAddToCart={onAddToCartHandler}
      />
      <Reviews productId={product.id} />
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

export async function action({ request }) {
  const data = await request.formData();
  const formId = data.get("formId");

  const authData = {
    rating: data.get("starRating"),
    title: data.get("title"),
    comment: data.get("comment")
  };

  console.log(authData);

  // const response = await fetch("http://localhost:5000/users/login", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify(authData)
  // });

  // if (response.status === 401 || response.status === 500) {
  //   return response;
  // }

  // const resData = await response.json();

  // console.log(resData);
  // return redirect("/");
}
