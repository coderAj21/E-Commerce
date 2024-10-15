import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductSlice from "./ProductSlice";


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
                        return <ProductSlice key={"product"+idx} data={val}
                        images={val.images} product_name ={val.product_name}
                        final_price={val.final_price} original_price={val.original_price} discount={val.discount}/>
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