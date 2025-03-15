import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Button } from "rizzui";
import { routes } from "../../config/routes";

const CheckoutInvoice = () => {
  let cartData = useSelector((store) => store?.cart.data);
  const sub_total =
    cartData?.reduce(
      (sum, curr) => sum + curr?.weight?.final_price * curr.quantity,
      0
    ) || 0;

  const discount =
    cartData?.reduce(
      (sum, curr) =>
        sum + curr?.weight?.final_price * (curr?.weight?.discount / 100),
      0
    ) || 0;

  const shipping = 0;

  const total = +(sub_total - discount).toFixed(2);
  return (
    <div className="w-full h-full flex flex-col px-3 gap-y-2 text-xl">
      <p className="text-2xl py-3 font-semibold ">Price Details</p>
      <div className="w-full flex justify-between">
        <p>Price ({cartData?.length} items)</p>
        <p>₹{sub_total.toFixed(2)}</p>
      </div>
      <div className="w-full flex justify-between">
        <p>Discount</p>
        <p>- ₹{discount.toFixed(2)}</p>
      </div>
      <div className="w-full flex justify-between">
        <p>Delivery Charges</p>
        <p>₹{shipping}</p>
      </div>
      <div className="w-full flex justify-between mt-4 border-t border-b py-2 border-black">
        <p className="text-2xl font-medium">Total Price</p>
        <p className="text-2xl font-semibold">₹{total}</p>
      </div>
      <div className="w-full flex gap-2 justify-end ">
        <p className="text-base text-green-700 font-medium">
          Expected delivery: 2-3 days
        </p>
      </div>
      <NavLink to={routes.checkout.index}>
        <Button
          variant="outline"
          className="w-full rounded-md bg-yellow-300 text-black font-semibold p-3
         hover:bg-yellow-400 transition duration-150 ease-in my-3 text-xl"
        >
          Proceed To Payment
        </Button>
      </NavLink>
    </div>
  );
};
export default CheckoutInvoice;
