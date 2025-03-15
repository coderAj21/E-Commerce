import React from "react";
import { useSelector } from "react-redux";
import WishlistCard from "../component/wishlist/WishlistCard";
import EmptyPage from "./EmptyPage";

const Wishlist = () => {
  let wishlist_arr = useSelector((store) => store?.wishlist?.data);
  if (wishlist_arr.length < 1) {
    return (
      <EmptyPage
        head1={"Your Wishlist is Empty...."}
        head2={"Explore more and save some items"}
      />
    );
  }
  return (
    <div className="w-full min-h-[calc(100vh-150px)] py-5  ">
      <p className="text-4xl max-sm:px-2 sm:text-center py-6 font-semibold font-serif ">
        My Wishlist
      </p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {wishlist_arr?.map((val, idx) => {
          return <WishlistCard key={"wishlist" + idx} data={val} />;
        })}
      </div>
    </div>
  );
};
export default Wishlist;
