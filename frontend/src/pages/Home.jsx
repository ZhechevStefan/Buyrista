import { Link, json, useLoaderData } from "react-router-dom";

import Card from "../components/Card/Card.jsx";
import styles from "./Home.module.css";

const HomePage = props => {
  const { products } = useLoaderData();

  if (products) {
    return (
      <>
        <h1 className={styles.title}>Latest Products</h1>
        <div className={styles.wrapper}>
          {products.map(product => (
            <Link key={product.id} to={`/products/${product.id}`}>
              <Card
                id={product.id}
                name={product.name}
                rating={product.rating}
                numReviews={product.numReviews}
                price={product.price}
                imageType={product.imageType}
                imageData={product.imageData}
              />
            </Link>
          ))}
        </div>
      </>
    );
  } else {
    return <div>Sorry, no products to show!</div>;
  }
};

export default HomePage;

export const loadProducts = async () => {
  const response = await fetch("http://localhost:5000/products");
  //{ products: Array }

  if (!response.ok) {
    return json({ message: "Could not fetch events." }, { status: 500 });
  } else {
    const resData = await response.json();

    return resData;
  }
};
