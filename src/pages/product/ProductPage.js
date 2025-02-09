import { useEffect, useState } from "react";
import Slider from "react-slick";
import { IoCart } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addItemToCart } from "../../redux/slices/cartSlice";
import { addItemToWishlist } from "../../redux/slices/wishlistSlice";
import CustomLoader from "../../component/custom-loader";
import { Button } from "rizzui";
import NutritionFacts from "../../component/product/NutritionFacts";
let url = process.env.REACT_APP_BACKEND_URL;

function findProductById(arr, idx) {
  for (let item of arr) {
    if (item.product_id === idx) {
      return item;
    }
  }
  return null;
}

function ProductPage() {
  const { idx } = useParams();
  let product_data = useSelector((store) => store?.product?.data);
  let dispatch = useDispatch();
  let data = findProductById(product_data, parseInt(idx));

  var settings = {
    infinite: true,
    speed: 500,
    dots: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    afterChange: (index) => {
      // console.log(index);
      setImageIndex(index);
    },
  };

  let [imageIndex, setImageIndex] = useState(1);
  const [product, setProduct] = useState({
    product_id: "",
    product_name: "",
    brand: "",
    category: "",
    flavour: "",
    weight: "",
  });
  function addToCart() {
    let obj = { ...data, quantity: 1 };
    dispatch(addItemToCart(obj));
  }
  function addToWishlist() {
    let obj = { ...data };
    dispatch(addItemToWishlist(obj));
  }

  useEffect(() => {
    if (data) {
      setProduct({
        product_id: data?.product_id,
        product_name: data?.product_name,
        brand: data?.brand,
        category: data?.category,
        flavour: data?.flavours[0],
        weight: data?.weights[0],
      });
    }
  }, [data]);
  if (!data) return <CustomLoader />;

  // console.log(data);
  return (
    <div className="w-full my-4 flex flex-col">
      <div className="relative w-full grid grid-cols-2  max-md:grid-cols-1">
        {/* image div */}
        <div className="w-full sticky  flex flex-col">
          <div className="w-10/12 mx-auto shadow-product my-4 h-1/2">
            <img
              className="w-full h-full p-1 object-contain"
              src={`${url}/${data?.images[imageIndex]?.value}`}
              alt="product"
            ></img>
          </div>
          <div className="w-3/4 my-2 mx-auto">
            {
              <Slider {...settings}>
                {data?.images?.map((obj, idx) => {
                  return (
                    <div
                      key={"product-image" + idx}
                      className="relative h-[90px] "
                    >
                      <img
                        onClick={() => setImageIndex(idx)}
                        className={`w-full h-full object-contain hover:cursor-pointer
                                                ${
                                                  imageIndex === idx
                                                    ? "border-2 border-black "
                                                    : ""
                                                }`}
                        src={`${url}/${obj.value}`}
                        alt={"product" + idx}
                      ></img>
                    </div>
                  );
                })}
              </Slider>
            }
          </div>
        </div>
        {/* product data div  and nutrition info*/}
        <div className="w-full">
          {/* Product Basic Details */}
          <div className="max-w-xl mx-auto h-fit flex flex-col shadow-md border rounded-md p-5 pb-10 my-4 ">
            <p className="text-2xl font-semibold">{product?.product_name}</p>
            <p className="mt-2">
              <span className="text-xl font-medium">By</span>
              <span className="text-yellow-600 text-xl font-semibold mx-2">
                {product?.brand?.value}
              </span>
            </p>
            {/* price  */}
            <div className="w-2/5 flex flex-col my-6 justify-start">
              <div className="w-full flex flex-row items-center gap-x-5">
                <p className="text-3xl text-red-500">
                  -{product?.weight?.discount}%
                </p>
                <p className="pr-4 text-3xl">₹{product?.weight?.final_price}</p>
              </div>
              <p className="my-2 text-sm text-zinc-500">
                M.R.P :
                <span className="line-through pr-4">
                  ₹{product?.weight?.original_price}
                </span>
                <span className="">Inclusive of all taxes</span>
              </p>
            </div>
            {/* Buttons  */}
            <div className="w-full flex  flex-wrap gap-x-4">
              <Button
                variant="outline"
                onClick={addToWishlist}
                className="w-fit rounded-md bg-zinc-700 text-white font-semibold p-1 px-4
                            hover:text-white transition duration-150 ease-in"
              >
                Add to Wishlist
              </Button>
              <Button
                variant="outline"
                onClick={addToCart}
                className="w-fit flex items-center rounded-md bg-yellow-300 text-black font-semibold p-1 px-3
                            hover:bg-yellow-400 transition duration-150 ease-in"
              >
                <span className="text-2xl px-2">
                  <IoCart />
                </span>
                <span>Add to Cart</span>
              </Button>
            </div>
            {/* weight and  flavour div */}
            <div className="w-full flex flex-col mt-10">
              {/* weight  */}
              <div className="w-full flex flex-col">
                <p className="text-2xl font-semibold">Weight</p>
                <div className="flex flex-wrap gap-x-4 my-3 cursor-pointer">
                  {data?.weights?.map((weight, idx) => {
                    return (
                      <p
                        onClick={() =>
                          setProduct({ ...product, weight: weight })
                        }
                        key={`weight-${idx}`}
                        className={`border-2 border-black  w-fit ${
                          weight?.product_weight_id ===
                          product?.weight?.product_weight_id
                            ? "bg-zinc-200"
                            : ""
                        }  text-center p-1 px-4 font-medium rounded hover:bg-gray-100 hover:scale-105 transition duration-150 ease-in`}
                      >
                        {weight?.label} {weight?.unit?.value}
                      </p>
                    );
                  })}
                </div>
              </div>
              {/* Flavour */}
              <div className="w-full flex flex-col mt-6">
                <p className="text-2xl font-semibold">Flavours</p>
                <div className="w-full flex flex-wrap gap-3 my-3 cursor-pointer">
                  {data?.flavours?.map((flavour, idx) => {
                    return (
                      <p
                        onClick={() =>
                          setProduct({ ...product, flavour: flavour })
                        }
                        key={`flavour-${idx}`}
                        className={`border-2 border-black  w-fit ${
                          flavour?.product_flavour_id ===
                          product?.flavour?.product_flavour_id
                            ? "bg-zinc-300"
                            : ""
                        }  text-center p-1 font-normal px-4 rounded hover:bg-gray-100 hover:scale-105 transition duration-150 ease-in`}
                      >
                        {flavour?.value}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-xl mx-auto">
            <NutritionFacts nutritions={data?.nutrition} />
          </div>
        </div>
      </div>
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
export default ProductPage;
