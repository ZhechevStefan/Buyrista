import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const WellcomeCarousel = props => {
  const items = props.items;
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear"
  };

  // const image1 = <img src="images/Iphone15-wellcome.png" alt="iPhone15" />;
  // const image2 = <img src="images/alexa.jpg" alt="alexa" />;
  // const image3 = <img src="images/playstation.jpg" alt="playstation" />;
  // const items = [image1, image2, image3];

  return (
    <Slider {...settings}>
      {items.map((item, idx) => (
        <div key={idx} className="img-body">
          {item}
        </div>
      ))}
    </Slider>
  );
};

export default WellcomeCarousel;
