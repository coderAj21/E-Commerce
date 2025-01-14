import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { addItemToCart } from "../redux/slices/cartSlice";
import { removeItemToWishlist } from "../redux/slices/wishlistSlice";



function WishlistCard({images,product_name,product_id,final_price,original_price,discount,data}){
    let url=process.env.REACT_APP_BACKEND_URL;
    let dispatch=useDispatch();
    function cartHandler(){
      let obj={...data,quantity:1};
      dispatch(addItemToCart(obj));
      dispatch(removeItemToWishlist(product_id));
    }
    function removeHandler(){
      dispatch(removeItemToWishlist(product_id));
    }
    return (
        <div className="h-fit flex flex-col w-[290px] shadow-product rounded-md py-2">
            <NavLink  to={`/product/${product_id}`} target="_blank" >
              <div className="w-[285px] h-[185px] object-contain">
                <img className="w-full h-full" src={`${url}/${images[0].value}`} alt="product-image" ></img>
              </div>
              <div  className="w-full px-4 ">
                <p className="my-1" >{product_name.substring(0,30)+'...'}</p>
                <div className="w-full flex items-center justify-start gap-x-2 ">
                  <span className="font-bold">₹ {final_price}</span>
                  <span className="line-through text-zinc-500">₹ {original_price}</span>
                  <span className="text-red-600 font-bold">{discount}% off</span>
                </div>
            </div>
            </NavLink>
            
            <div className="w-full flex gap-x-3 px-4 py-3">
              <button onClick={removeHandler} className="w-full rounded-md bg-red-600 text-white font-semibold p-1 hover:bg-red-700 transition duration-150 ease-in
              ">Remove</button>
              <button onClick={cartHandler} className="w-full rounded-md bg-yellow-300 text-black font-semibold p-1 hover:bg-yellow-400 transition duration-150 ease-in
              ">Add to Cart</button>
            </div>
        </div>
    )

}

export default WishlistCard;