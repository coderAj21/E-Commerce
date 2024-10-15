import { useState } from "react";
import Slider from "react-slick";
import { FaRegHeart } from "react-icons/fa";

let data={
      "product_id": 2,
      "product_name": "Optimum Nutrition (ON) Gold Standard 100% Whey Protein Powder",
      "description": "Optimum Nutrition (ON) Gold Standard 100% Whey Protein Powder",
      "category_id": 1,
      "original_price": 6999,
      "final_price": 6000,
      "quantity": 100,
      "discount": 20,
      "images": [
        {
          "value": "1728743837906.jpeg"
        },
        {
          "value": "1728743837912.jpeg"
        },
        {
          "value": "1728743837915.jpeg"
        },
        {
          "value": "1728743837918.jpeg"
        }
      ]
}

let url=process.env.REACT_APP_BACKEND_URL;


function ProductPage(){
    var settings = {
        infinite: true,
        speed: 500,
        dots:true,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <Arrow />,
        prevArrow: <Arrow />,
        afterChange:(index)=>{
            console.log(index);
            setImageIndex(index);
        }
    };
    let [imageIndex,setImageIndex]=useState(2);
    let [productCount,setProductCount]=useState(0);
    return (
        <div className="w-full h-full my-4  flex flex-col">
            <div className="w-full flex flex-wrap">
                {/* image div */}
                <div className="w-1/2 flex flex-col">
                    <div className="w-10/12 mx-auto shadow-product my-4 h-1/2">
                        <img className="w-full h-full p-1 object-contain" src={`${url}/${data?.images[imageIndex]?.value}`} alt="product"></img>
                    </div>
                    
                    <div className="w-3/4 my-2 mx-auto">
                        {
                            <Slider {...settings}>
                                {
                                    data?.images?.map((obj,idx)=>{
                                        return <div key={"product-image"+idx} className="relative h-[90px] ">
                                            <img onClick={()=>setImageIndex(idx)} className={`w-full h-full object-contain
                                                ${imageIndex===idx?"border-2 border-black ":""}`}
                                                src={`${url}/${obj.value}`} alt={"product"+idx} ></img>
                                        </div>
                                    })
                                }
                            </Slider>
                        }
                    </div>

                </div>
                {/* product data div */}
                <div className="w-1/2 flex flex-col border-2 my-4 p-4" >
                    <p className="text-2xl font-semibold">{data.product_name}</p>
                    <p className="" >
                        <span className="text-2xl font-semibold">By</span>
                        <span className="text-yellow-600 text-lg font-semibold mx-2" >Brand Name</span>
                    </p>
                    <div className="w-full flex flex-col my-4">
                        <p>MRP :₹<span className="line-through">{data.original_price}</span></p>
                        
                        <span><FaRegHeart  className="text-2xl cursor-pointer"/></span>
                    </div>
                    <div className="flex">
                        {/* product count */}
                        <div className="flex">
                            <span className="select-none cursor-pointer" onClick={()=>{
                                if(productCount===0)return;
                                setProductCount(productCount-1);
                            }} >-</span>
                            <span className="select-none">{productCount}</span>
                            <span className="select-none cursor-pointer" onClick={()=>{
                                if(productCount>=5)return;
                                setProductCount(productCount+1);
                            }}>+</span>
                        </div>
                        <button className="w-fit rounded-md bg-yellow-300 text-black font-semibold p-1 hover:bg-yellow-400 transition duration-150 ease-in
              ">Add to Cart</button>
                    </div>
                </div>
            </div>
            {/* Additional information */}
            <div>

            </div>
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
export default ProductPage;