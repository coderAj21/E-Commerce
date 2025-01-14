import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />
  };

function Carousel({images}){

    return (
        <div className="relative w-full h-full my-6">
            <Slider {...settings}>
                {
                    images.map((val,idx)=>{
                        return <img key={"img"+idx} src={val} alt="discount-slider"></img>
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


export default Carousel;