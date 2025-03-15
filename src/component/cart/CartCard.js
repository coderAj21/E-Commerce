import React from "react";
import { useDispatch } from "react-redux";
import {
  decreaseItemQuantity,
  increaseItemQuantity,
  removeItemToCart,
} from "../../redux/slices/cartSlice";
import { Button } from "rizzui";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { BASE_URL } from "../../config/api-services";

const CartCard = ({ obj }) => {
  let dispatch = useDispatch();
  function removeHandler() {
    dispatch(removeItemToCart(obj?.product_id));
  }
  function decreaseQuantiy() {
    dispatch(decreaseItemQuantity(obj?.product_id));
  }
  function increaseQuantity() {
    dispatch(increaseItemQuantity(obj?.product_id));
  }
  return (
    <div className="w-full p-4 flex flex-col gap-x-2 shadow-md border mb-4">
      <div className="w-full flex items-start gap-5 sm:gap-10 ">
        <div className="min-w-[120px] w-2/12">
          <img
            src={`${BASE_URL}/${obj?.images[0]?.value}`}
            className="w-full object-cover rounded "
            alt="cart_card_image "
          ></img>
        </div>
        <div className="-mt-2 min-w-[200px]  w-full ">
          <p className="sm:text-lg font-medium">{obj?.product_name}</p>
          <div className="flex gap-2 my-1 text-gray-700 text-base ">
            <p>
              Weight: {obj?.weight?.label}
              {obj?.weight?.unit?.value},
            </p>
            <p>Flavour: {obj?.flavour?.value}</p>
          </div>
          <p className="font-medium">Brand: {obj?.brand?.value} </p>
          <div className="flex gap-3 my-1 items-center">
            <p className="line-through text-gray-600 text-lg sm:text-xl">
              ₹
              {Math.round(obj?.weight?.original_price * obj?.quantity * 100) /
                100}
            </p>
            <p className="text-xl sm:text-2xl  font-bold">
              ₹
              {Math.round(obj?.weight?.final_price * obj?.quantity * 100) / 100}
            </p>
            <p className="text-lg sm:text-xl text-green-600 font-medium">
              {" "}
              {obj?.weight?.discount}% off
            </p>
          </div>
        </div>
      </div>
      <div className="w-full sm:mt-2 flex items-center gap-2 ">
        <div className="min-w-[130px] sm:min-w-[150px] w-2/12 gap-x-2 flex items-center select-none">
          <Button
            onClick={decreaseQuantiy}
            variant="solid"
            size="sm"
            disabled={!(obj?.quantity > 1)}
            className="rounded-full w-8 h-8"
          >
            <FaMinus className="size-6" />
          </Button>
          <p className="border-2 border-black px-3 sm:px-5 text-xl text-center font-semibold">
            {obj?.quantity}
          </p>
          <Button
            onClick={increaseQuantity}
            variant="solid"
            size="sm"
            disabled={!(obj?.quantity < 5)}
            className="rounded-full w-8 h-8"
          >
            <FaPlus className="size-6" />
          </Button>
        </div>
        <Button
          onClick={removeHandler}
          variant="text"
          className="p-0 text-xl text-red-600 hover:text-red-500 underline sm:-mt-2"
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default CartCard;
