import React from 'react'
import { useSelector } from 'react-redux';
import WishlistCard from '../component/wishlist/WishlistCard';
import EmptyPage from './EmptyPage';

const Wishlist = () => {
    let wishlist_arr=useSelector((store)=>store?.wishlist?.data);
    if(wishlist_arr.length<1){
        return <EmptyPage head1={"Your Wishlist is Empty...."} head2={"Explore more and save some items"} />
    }
  return (
    <div className='w-full min-h-screen py-10'>
        <p className='text-4xl text-center py-6 font-semibold font-serif '>My WishList</p>
        <div className='flex flex-wrap gap-6'>
            {
                wishlist_arr?.map((val,idx)=>{
                    return <WishlistCard key={"wishlist"+idx} data={val} />
                })
            }
        </div>
    </div>
  )
}
export default Wishlist;