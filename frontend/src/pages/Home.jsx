import { Link } from "react-router-dom";

import products from "../../public/products.js";
import Card from "../components/Card/Card.jsx";
import styles from "./Home.module.css";

const HomePage = props => {
  return (
    <>
      <h1 className={styles.title}>Latest Products</h1>
      <div className={styles.wrapper}>
        {products.map(product => (
          <Link key={product.id} to={`/products/${product.id}`}>
            <Card
              id={product.id}
              img={product.image}
              name={product.name}
              rating={product.rating}
              numReviews={product.numReviews}
              price={product.price}
            />
          </Link>
        ))}
      </div>
    </>
  );
};

export default HomePage;
