import { useParams } from "react-router-dom";

import products from "../../public/products.js";
import styles from "./Product.module.css";
import ProductCard from "../components/ProductCard/ProductCard.jsx";

const ProductPage = props => {
  const { productId } = useParams();

  const product = products.filter(pr => pr.id === productId)[0];

  return <ProductCard product={product} />;
};

export default ProductPage;
