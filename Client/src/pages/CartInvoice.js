import React from 'react'
import { useSelector } from 'react-redux';

const CartInvoice = () => {
    let cartData=useSelector((store)=>store?.cart.data);
    let sub_total=cartData?.reduce((sum,curr)=>{
        return sum+(curr.final_price*curr.quantity)
    },0)
    sub_total=Math.round((sub_total*100))/100;
    let shipping=0;
    let tax=cartData?.reduce((sum,curr)=>{
        return sum+(curr.final_price*(curr.discount/100));
    },0);
    tax=Math.round((tax*100))/100;
  return (
    <div className='w-full h-full flex flex-col px-3 gap-y-2'>
        <p className='text-2xl py-3 font-semibold '>Cart Total</p>
        <div className='w-full flex justify-between'>
            <p>Sub-Total</p>
            <p>₹{sub_total}</p>
        </div>
        <div className='w-full flex justify-between'>
            <p>Shipping</p>
            <p>₹{shipping}</p>
        </div>
        <div className='w-full flex justify-between'>
            <p>Tax</p>
            <p>₹{tax}</p>
        </div>
        <div className='w-full flex justify-between mt-4 border-t-2 py-1 border-black'>
            <p className='text-2xl font-semibold'>Total</p>
            <p className='text-2xl font-semibold'>₹{sub_total+tax}</p>
        </div>
        <button
        className="w-full rounded-md bg-yellow-300 text-black font-semibold p-2
         hover:bg-yellow-400 transition duration-150 ease-in my-2 text-xl"
        >Proceed</button>
    </div>
  )
}
;
export default CartInvoice;