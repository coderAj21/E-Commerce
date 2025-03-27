import { FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { addItemToCart } from "../../redux/slices/cartSlice";
import { addItemToWishlist } from "../../redux/slices/wishlistSlice";
import { Button, Tooltip } from "rizzui";
import toast from "react-hot-toast";
import { BASE_URL } from "../../config/api-services";
import { routes } from "../../config/routes";

function ProductCard({ data }) {
  let dispatch = useDispatch();
  let cart = useSelector((store) => store?.cart)?.map;

  function cartHandler() {
    let obj = {
      product_id: data?.product_id,
      product_name: data?.product_name,
      brand: data?.brand,
      category: data?.category,
      flavour: data?.flavours[0],
      weight: data?.weights[0],
      images: data?.images,
      quantity: 1,
    };
    dispatch(addItemToCart(obj));
    return toast.success("Added to Cart");
  }
  function wishlistHandler() {
    let obj = {
      product_id: data?.product_id,
      product_name: data?.product_name,
      brand: data?.brand,
      category: data?.category,
      flavour: data?.flavours[0],
      weight: data?.weights[0],
      images: data?.images,
      quantity: 1,
    };
    dispatch(addItemToWishlist(obj));
    return toast.success("Added to Wishlist");
  }
  return (
    <div
      className={`flex flex-col w-[200px] sm:w-[280px] max-sm:ml-3 shadow-md rounded-md border`}
    >
      <div className="w-full flex h-7 items-center justify-end mt-1 sm:mt-2 sm:mr-4">
        <Tooltip content="Add to Wishlist">
          <Button onClick={wishlistHandler} variant="text">
            <FaRegHeart className="text-2xl" />
          </Button>
        </Tooltip>
      </div>
      <NavLink to={`/product/${data?.product_id}`} target="_blank">
        <div className={`w-full h-[185px] p-2 sm:p-3 object-contain`}>
          <img
            className="w-full h-full rounded-md"
            src={`${BASE_URL}/${data?.images[0].value}`}
            alt="product-image"
          ></img>
        </div>
        <div className="w-full px-2 sm:px-4 ">
          <Tooltip rounded="pill" color="info" content={data?.product_name}>
            <p className="my-1 text-sm sm:text-base truncate ">
              {data?.product_name}
            </p>
          </Tooltip>
          <div className="w-full flex items-center justify-start gap-x-2 text-sm sm:text-base">
            <span className="font-bold">₹ {data?.weights[0]?.final_price}</span>
            <span className="line-through text-zinc-500">
              ₹ {data?.weights[0]?.original_price}
            </span>
            <span className="text-red-600 font-bold">
              {data?.weights[0]?.discount}% off
            </span>
          </div>
        </div>
      </NavLink>

      <div className="w-full px-2 py-2 sm:p-4 ">
        {data?.product_id in cart ? (
          <Link to={routes?.cart?.listing}>
            <Button variant="solid" className="w-full">
              Go to Cart
            </Button>
          </Link>
        ) : (
          <Button
            variant="outline"
            onClick={cartHandler}
            className={`w-full rounded-md bg-yellow-300 text-black text-base font-semibold
                    sm:p-1 hover:bg-yellow-400 transition duration-150 ease-in`}
          >
            Add to Cart
          </Button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
