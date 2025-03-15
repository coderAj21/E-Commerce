import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "./product/ProductCard";

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
  nextArrow: <Arrow />,
  prevArrow: <Arrow />,
};

function ProductSlider({ data, heading }) {
  return (
    <div className="relative w-full my-20 ">
      <div className="text-2xl font-bold my-4 max-sm:my-2 max-sm:px-2 ">
        {heading}
      </div>
      <Slider {...settings}>
        {data?.map((val, idx) => {
          return <ProductCard key={"product" + idx} data={val} />;
        })}
      </Slider>
    </div>
  );
}

function Arrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black", zIndex: "100" }}
      onClick={onClick}
    />
  );
}

export default ProductSlider;
