import { useState } from "react";
import Slider from "react-slick";
import { IoCart } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addItemToCart } from "../../redux/slices/cartSlice";
import { addItemToWishlist } from "../../redux/slices/wishlistSlice";
import CustomLoader from "../../component/custom-loader";
import { Button } from "rizzui";
import NutritionFacts from "../../component/product/NutritionFacts";
import { useQuery } from "@tanstack/react-query";
import APISERVICES, { BASE_URL } from "../../config/api-services";
import { routes } from "../../config/routes";

function ProductPage() {
  const { idx } = useParams();
  var settings = {
    infinite: true,
    speed: 500,
    dots: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
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
    afterChange: (index) => {
      setImageIndex(index);
    },
  };
  let cart = useSelector((store) => store?.cart)?.map;

  const dispatch = useDispatch();

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
    let obj = { ...product, quantity: 1 };
    dispatch(addItemToCart(obj));
  }
  function addToWishlist() {
    let obj = { ...product };
    dispatch(addItemToWishlist(obj));
  }

  const { data = {}, isLoading: apiLoading } = useQuery({
    queryKey: ["product_detail", idx],
    queryFn: async () => {
      try {
        let res = await APISERVICES.product.get(idx);
        if (res?.success) {
          setProduct({
            product_id: res?.data?.product_id,
            product_name: res?.data?.product_name,
            brand: res?.data?.brand,
            category: res?.data?.category,
            flavour: res?.data?.flavours[0],
            weight: res?.data?.weights[0],
            images: res?.data?.images,
          });
        }
        return res?.data || {};
      } catch (error) {
        return {};
      }
    },
  });

  if (apiLoading) {
    return <CustomLoader />;
  }

  return (
    <div className="w-full my-4 flex flex-col">
      <div className="relative w-full grid grid-cols-2  max-md:grid-cols-1">
        {/* image div */}
        <div className="w-full sticky  flex flex-col">
          <div className="w-10/12 mx-auto shadow-product my-4 h-1/2">
            <img
              className="w-full h-full p-1 object-contain"
              src={`${BASE_URL}/${data?.images[imageIndex]?.value}`}
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
                        src={`${BASE_URL}/${obj.value}`}
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

            {/* weight and  flavour div */}
            <div className="w-full flex flex-col">
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
              <div className="w-full flex flex-col mt-4">
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
            {/* Buttons  */}
            <div className="w-full flex flex-wrap gap-x-4 mt-10">
              <Button
                variant="outline"
                onClick={addToWishlist}
                className="w-fit rounded-md bg-zinc-700 text-white font-semibold p-1 px-4
                            hover:text-white transition duration-150 ease-in"
              >
                Add to Wishlist
              </Button>
              {data?.product_id in cart ? (
                <Link to={routes?.cart?.listing}>
                  <Button variant="solid" className="w-fit flex items-center">
                    <span className="text-2xl px-2">
                      <IoCart />
                    </span>
                    <span>Go to Cart</span>
                  </Button>
                </Link>
              ) : (
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
              )}
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
