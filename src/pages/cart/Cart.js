import React from "react";
import { useSelector } from "react-redux";
import EmptyPage from "../EmptyPage";
import CartCard from "../../component/cart/CartCard";
import CartInvoice from "../../component/cart/CartInvoice";

const Cart = () => {
  let cart = useSelector((store) => store?.cart?.data);
  if (cart?.length < 1) {
    return (
      <EmptyPage
        head1={"Your Cart is Empty.."}
        head2={"Looks Like you haven't made your choice yet"}
      />
    );
  }
  return (
    <div className="w-full min-h-screen">
      <div className="w-full h-full flex flex-col lg:flex-row gap-5 my-8">
        <div className="w-full p-2 max-h-[700px] overflow-y-auto rounded-lg">
          {cart?.map((val, idx) => {
            return <CartCard key={"cart-cart" + idx} obj={val} />;
          })}
        </div>
        <div className="min-w-[350px] h-full shadow-md rounded-lg border m-2">
          <CartInvoice />
        </div>
      </div>
    </div>
  );
};

export default Cart;
