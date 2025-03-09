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
    nextArrow: <Arrow />,
    prevArrow: <Arrow />
  };

function ProductSlider({data,heading}){

    return (
        <div className="relative w-full my-20">
            <div className="text-2xl font-bold my-4">{heading}</div>
            <Slider {...settings}>
                {
                    data?.map((val,idx)=>{
                        return (
                          <ProductCard
                            key={"product" + idx}
                            data={val}
                          />
                        );
                    })
                }
            </Slider>
            
        </div>
    )
}

function Arrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style,
        display: "block", background:"black",zIndex:"100" }}
      onClick={onClick}
    />
  );
}


export default ProductSlider;