import { json, useLoaderData } from "react-router-dom";

import Card from "../components/Card/Card.jsx";
import ProductsCarousel from "../components/Carousel/ProductsCarousel.jsx";
import WellcomeCarousel from "../components/Carousel/WellcomeCarousel.jsx";
import styles from "./Home.module.css";

const HomePage = props => {
  const { products } = useLoaderData();

  const image1 = <img src="images/Iphone15-wellcome.png" alt="iphone" />;
  const image2 = <img src="images/airpods.jpg" alt="airpods" />;
  const image3 = <img src="images/playstation.jpg" alt="playstation" />;
  const items = [image1, image2, image3];

  if (products) {
    return (
      <>
        <div className={styles["carousel-container"]}>
          <WellcomeCarousel items={items} />
        </div>
        <h1 className={styles.title}>Latest Products</h1>
        <div className={styles["products-container"]}>
          <ProductsCarousel products={products} />
        </div>
      </>
    );
  } else {
    return <div>Sorry, no products to show!</div>;
  }
};

export default HomePage;

export const loadProducts = async () => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products`);
  //{ products: Array }

  if (!response.ok) {
    return json({ message: "Could not fetch events." }, { status: 500 });
  } else {
    const resData = await response.json();

    return resData;
  }
};
