import { Link } from "react-router-dom";

import Card from "../Card/Card.jsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductsCarousel = props => {
  const products = props.products;
  const settings = {
    className: "product-carousel",
    dots: true,
    arrows: false,
    infinite: false,
    speed: 800,
    slidesToShow: 5,
    slidesToScroll: 5,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1512,
        settings: {
          arrows: true,
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 1218,
        settings: {
          arrows: true,
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }
    ]
  };

  return (
    <Slider {...settings}>
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
    </Slider>
  );
};

export default ProductsCarousel;
