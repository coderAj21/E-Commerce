import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { addItemToCart } from "../../redux/slices/cartSlice";
import { addItemToWishlist } from "../../redux/slices/wishlistSlice";
import { Button, Tooltip } from "rizzui";
import toast from "react-hot-toast";

function ProductCard({ data }) {
  let url = process.env.REACT_APP_BACKEND_URL;
  let dispatch = useDispatch();

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
    <div className={`flex flex-col w-[280px] shadow-md border rounded-md`}>
      <div className="flex h-7 items-center justify-end mr-4 mt-2">
        <Tooltip content="Add to Wishlist">
          <Button onClick={wishlistHandler} variant="text">
            <FaRegHeart className="text-2xl" />
          </Button>
        </Tooltip>
      </div>
      <NavLink to={`/product/${data?.product_id}`} target="_blank">
        <div className={`w-full h-[185px] p-3 object-contain`}>
          <img
            className="w-full h-full rounded-md"
            src={`${url}/${data?.images[0].value}`}
            alt="product-image"
          ></img>
        </div>
        <div className="w-full px-4 ">
          <Tooltip rounded="pill" color="info" content={data?.product_name}>
            <p className="my-1">
              {data?.product_name.substring(0, 25) + "..."}
            </p>
          </Tooltip>
          <div className="w-full flex items-center justify-start gap-x-2 ">
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

      <div className="w-full px-4 py-4">
        <Button
          variant="outline"
          onClick={cartHandler}
          className="w-full rounded-md bg-yellow-300 text-black text-base font-semibold p-1 hover:bg-yellow-400 transition duration-150 ease-in
              "
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;
