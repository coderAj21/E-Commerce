import React from "react";
import { useSelector } from "react-redux";
import EmptyPage from "../EmptyPage";
import CartCard from "../../component/cart/CartCard";
import CartInvoice from "../../component/cart/CartInvoice";

const Cart = () => {
  let cart = useSelector((store) => store?.cart?.data);
  return (
    <div className="w-full min-h-screen">
      {cart.length > 0 ? (
        <div className="w-full h-full flex flex-col xl:flex-row gap-5 my-8">
          {/* items banner */}
          <div className="w-full p-2 h-[700px] overflow-y-auto">
            {cart?.map((val, idx) => {
              return (
                <CartCard
                  key={"cart-cart" + idx}
                  obj={val}
                />
              );
            })}
          </div>
          <div className="min-w-[350px] h-full shadow-md">
            <CartInvoice />
          </div>
        </div>
      ) : (
        <EmptyPage
          head1={"Your Cart is Empty"}
          head2={"Looks Like you haven't made your choice yet"}
        />
      )}
    </div>
  );
};

export default Cart;
