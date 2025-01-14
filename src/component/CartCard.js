import React from 'react'
import { RxCrossCircled } from "react-icons/rx";
import { useDispatch } from 'react-redux';
import { decreaseItemQuantity, increaseItemQuantity, removeItemToCart } from '../redux/slices/cartSlice';


const CartCard = ({product_id,product_name,final_price,images,quantity}) => {
    let dispatch=useDispatch();
    function removeHandler(){
        dispatch(removeItemToCart(product_id));
    }
    function decreaseQuantiy(){
        dispatch(decreaseItemQuantity(product_id));
    }
    function increaseQuantity(){
        dispatch(increaseItemQuantity(product_id));
    }
  return (
    <div className='w-full my-8 px-3 flex gap-x-2 items-center justify-between'>
        <div className='relative w-[40%] flex items-center gap-x-4'>
            <div className="flex items-center justify-center">
                <RxCrossCircled 
                onClick={removeHandler} 
                className='text-red-600 text-3xl cursor-pointer hover:scale-95'
                />
            </div>

            <img src={`http://localhost:5051/${images[0].value}`}
                 className='w-[75px] border border-black'  
             alt='cart card photu'></img>
            <p className='text-wrap'>{product_name}</p>
        </div>
        <p className="w-[20%] text-2xl">₹{final_price}</p>
        <div className='w-[20%] h-fit'>
            <div className='w-fit gap-x-4 flex items-center text-2xl border border-black select-none'>
                <p
                onClick={decreaseQuantiy} 
                className={`p-1 px-4 pb-2 font-bold text-3xl cursor-pointer hover:scale-110 border-r-2 ${quantity>1?"":"pointer-events-none bg-zinc-200"}`}>-</p>
                <p className='p-1 '>{quantity}</p>
                <p onClick={increaseQuantity}
                className={`p-1 px-3 font-bold text-3xl cursor-pointer hover:scale-105 border-l-2 ${quantity<5?"":"pointer-events-none bg-zinc-200"} `}>+</p>
            </div>
        </div>
        <p className="w-[10%] text-2xl">₹{quantity*final_price}</p>
    </div>
  )
}

export default CartCard;