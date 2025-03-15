import { useDispatch } from "react-redux";
import { addItemToCart } from "../../redux/slices/cartSlice";
import { removeItemToWishlist } from "../../redux/slices/wishlistSlice";
import { Button } from "rizzui";
import { BASE_URL } from "../../config/api-services";

function WishlistCard({ data }) {
  let dispatch = useDispatch();
  function cartHandler() {
    let obj = {
      product_id: data?.product_id,
      product_name: data?.product_name,
      brand: data?.brand,
      category: data?.category,
      flavour: data?.flavour,
      weight: data?.weight,
      images: data?.images,
      quantity: 1,
    };
    dispatch(addItemToCart(obj));
    dispatch(removeItemToWishlist(data?.product_id));
  }
  function removeHandler() {
    dispatch(removeItemToWishlist(data?.product_id));
  }
  return (
    <div className="w-full p-4 flex flex-col gap-x-2 shadow-md border my-1">
      <div className="w-full flex items-start gap-5">
        <div className="min-w-[120px] w-5/12">
          <img
            src={`${BASE_URL}/${data?.images[0]?.value}`}
            className="w-full object-cover rounded "
            alt="cart_card_image "
          ></img>
        </div>
        <div className="-mt-2 w-full ">
          <p className="sm:text-lg font-medium">{data?.product_name}</p>
          <div className="flex gap-2 my-1 text-gray-700 text-base ">
            <p>
              Weight: {data?.weight?.label}
              {data?.weight?.unit?.value},
            </p>
            <p>Flavour: {data?.flavour?.value}</p>
          </div>
          <p className="font-medium">Brand: {data?.brand?.value} </p>
          <div className="flex gap-3 my-1 items-center">
            <p className="line-through text-gray-600 text-lg sm:text-xl">
              ₹
              {Math.round(data?.weight?.original_price * data?.quantity * 100) /
                100}
            </p>
            <p className="text-xl sm:text-2xl  font-bold">
              ₹
              {Math.round(data?.weight?.final_price * data?.quantity * 100) /
                100}
            </p>
            <p className="text-lg sm:text-xl text-green-600 font-medium">
              {" "}
              {data?.weight?.discount}% off
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex gap-x-3 py-2">
        <Button
          variant="outline"
          onClick={removeHandler}
          className="w-full rounded-md bg-red-600 text-white font-bold p-1
                      hover:bg-red-700 transition duration-150 ease-in"
        >
          Remove
        </Button>
        <Button
          variant="outline"
          onClick={cartHandler}
          className="w-full rounded-md bg-yellow-300 text-black font-bold p-1
                       hover:bg-yellow-400 transition duration-150 ease-in"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default WishlistCard;
