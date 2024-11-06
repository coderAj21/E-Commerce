import {useState } from "react";
import Slider from "react-slick";
import { IoCart } from "react-icons/io5";
import {useDispatch, useSelector} from "react-redux"
import {useParams } from "react-router-dom";
import { addItemToCart } from "../redux/slices/cartSlice";
import Spinner from "../component/Spinner";
import { addItemToWishlist } from "../redux/slices/wishlistSlice";
let url=process.env.REACT_APP_BACKEND_URL;

function findProductById(arr,idx){
    for (let item of arr){
            if (item.product_id===idx){
                return item;
            }
        }
        return undefined;
}


function ProductPage(){
    const {idx}=useParams();
    let product=useSelector((store)=>store?.product?.data);
    let dispatch=useDispatch();
    let data=findProductById(product,parseInt(idx));
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
    let [imageIndex,setImageIndex]=useState(1);
    let [weight,setWeight]=useState("KG");
    
    function addToCart(){
        let obj={...data,quantity:1};
        dispatch(addItemToCart(obj));
    }
    function addToWishlist(){
        let obj={...data};
        dispatch(addItemToWishlist(obj));
    }
    if(!data){
        return(
            <div className="w-full min-h-screen flex items-center justify-center">
                <Spinner/>
            </div>
        )
    }
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
                    <p className="mt-2" >
                        <span className="text-xl font-medium">By</span>
                        <span className="text-yellow-600 text-xl font-semibold mx-2" >Brand Name</span>
                    </p>
                    {/* price  */}
                    <div className="w-2/5 flex flex-col my-4 mt-10 justify-start">
                        <div className="w-full flex flex-row items-center gap-x-5">
                            <p className="text-3xl text-red-500">-{data.discount}%</p>
                            <p className="pr-4 text-3xl">₹{data.final_price}</p>
                        </div>
                        <p className="my-2 text-sm text-zinc-500">
                            M.R.P : 
                            <span className="line-through pr-4">₹{data.original_price}</span>
                            <span className="">Inclusive of all taxes</span>
                        </p>
                    </div>
                    {/* Buttons  */}
                    <div className="w-1/2 flex flex-row justify-between">
                        <button onClick={addToWishlist}
                            className="w-fit rounded-md bg-zinc-700 text-white font-semibold p-1 px-4
                            hover:bg-zinc-900 transition duration-150 ease-in">
                            Add to Wishlist
                        </button>
                        <button
                            onClick={addToCart}
                            className="w-fit flex items-center rounded-md bg-yellow-300 text-black font-semibold p-1 px-3
                            hover:bg-yellow-400 transition duration-150 ease-in">
                            <span className="text-2xl px-2"><IoCart/></span>
                            <span>Add to Cart</span> 
                        </button>
                    </div>
                    {/* weight and  flavour div */}
                    <div className="w-full flex flex-col my-10">
                        {/* weight  */}
                        <div className="w-4/5 flex flex-col">
                            <div className="w-1/2 flex flex-row gap-x-4 items-center">
                                <p className="text-2xl font-semibold">Weight</p>
                                <div className="text-lg">
                                    <button
                                        className={`border p-2 font-medium rounded-l-md ${weight==="KG"?"bg-yellow-300":""}`}
                                        onClick={()=>setWeight("KG")}>KG</button>
                                    <button 
                                        className={`border p-2 font-medium rounded-r-md ${weight==="LB"?"bg-yellow-300":""} `}
                                        onClick={()=>setWeight("LB")}>LB</button>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-x-4 my-3 cursor-pointer">
                                <p className="border-2 border-black w-[75px] text-center p-1 px-2">2.5 {weight}</p>
                                <p className="border-2 border-black w-[75px] text-center p-1 px-2">5.0 {weight}</p>
                                <p className="border-2 border-black w-[75px] text-center p-1 px-2">7.5 {weight}</p>
                                <p className="border-2 border-black w-[75px] text-center p-1 px-2">10.0 {weight}</p>
                            </div>
                        </div>
                        {/* Flavour */}
                        <div className="w-4/5 flex flex-col my-6">
                            <div className="w-1/2 flex flex-row gap-x-4 items-center">
                                <p className="text-2xl font-semibold">Flavours</p>
                            </div>
                            <div className="w-full flex flex-wrap gap-3 my-3 cursor-pointer">
                                <p className="border-2 border-black w-fit text-center p-1 px-2 rounded">Rich Chocolate</p>
                                <p className="border-2 border-black w-fit text-center p-1 px-2 rounded">Blue Tokai Coffee</p>
                                <p className="border-2 border-black w-fit text-center p-1 px-2 rounded">Butter Cookie</p>
                                <p className="border-2 border-black w-fit text-center p-1 px-2 rounded">Kesar Kulfi</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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