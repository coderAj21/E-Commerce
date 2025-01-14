import React from 'react'
import CartCard from '../component/CartCard';
import { useSelector } from 'react-redux';
import CartInvoice from './CartInvoice';
import EmptyPage from './EmptyPage';

const Cart = () => {
  let cart=useSelector((store)=>store?.cart?.data);
  return (
    <div className='w-full min-h-screen'>
    {
      cart.length>0?
      (<div className='w-full h-full flex gap-x-4 my-8'>
      {/* items banner */}
      <div className='w-[70%] h-full shadow-md'>
        <p className='text-2xl p-3 font-semibold '>Shopping Cart</p>
        <div className='w-full px-3 p-1 flex justify-between border bg-zinc-200'>
          <p className='w-[40%]'>PRODUCTS</p>
          <p className='w-[20%]'>PRICE</p>
          <p className='w-[20%] px-4'>QUANTITY</p>
          <p className='w-[10%]'>TOTAL</p>
        </div>
        {/* add items div */}
        <div>
          {
            cart?.map((val,idx)=>{
              return <CartCard key={"cart-cart"+idx} product_id={val.product_id} product_name={val.product_name} final_price ={val.final_price} images={val.images} quantity={val.quantity} />
            })
          }
        </div>
      </div>
      <div className='w-[30%] h-full shadow-md'>
        <CartInvoice/>
      </div>
      </div>)
      :
      (
        <EmptyPage head1={"Your Cart is Empty"} head2={"Looks Like you haven't made your choice yet"}/>
      )
    }
    </div>
  )
}

export default Cart;