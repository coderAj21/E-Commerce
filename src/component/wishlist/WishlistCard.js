import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { addItemToCart } from "../../redux/slices/cartSlice";
import { removeItemToWishlist } from "../../redux/slices/wishlistSlice";
import { Button } from "rizzui";

function WishlistCard({ data }) {
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
    dispatch(removeItemToWishlist(data?.product_id));
  }
  function removeHandler() {
    dispatch(removeItemToWishlist(data?.product_id));
  }
  console.log(data);
  return (
    <div className="h-fit flex flex-col w-[290px] shadow-product rounded-md py-2">
      <NavLink to={`/product/${data?.product_id}`} target="_blank">
        <div className="w-[285px] h-[185px] object-contain">
          <img
            className="w-full h-full"
            src={`${url}/${data?.images[0].value}`}
            alt="product-image"
          ></img>
        </div>
        <div className="w-full px-4 ">
          <p className="my-1">{data?.product_name?.substring(0, 30) + "..."}</p>
          <div className="w-full flex items-center justify-start gap-x-2 ">
            <span className="font-bold">₹ {data?.weight?.final_price}</span>
            <span className="line-through text-zinc-500">
              ₹ {data?.weight?.original_price}
            </span>
            <span className="text-red-600 font-bold">
              {data?.weight?.discount}% off
            </span>
          </div>
        </div>
      </NavLink>

      <div className="w-full flex gap-x-3 px-4 py-3">
        <Button
        variant="outline"
          onClick={removeHandler}
          className="w-full rounded-md bg-red-600 text-white font-semibold p-1 hover:bg-red-700 transition duration-150 ease-in
              "
        >
          Remove
        </Button>
        <Button
          variant="outline"
          onClick={cartHandler}
          className="w-full rounded-md bg-yellow-300 text-black font-semibold p-1 hover:bg-yellow-400 transition duration-150 ease-in
              "
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default WishlistCard;
