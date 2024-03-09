import React from 'react';
import { CgMenuLeftAlt } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";
import { IoPersonCircle } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";



const Header = () => {
  return (
    <div className='flex flex-row items-center justify-between bg-[#232a37] text-white h-14'>
        <div key="logo" className='flex items-center gap-2 px-2'>
          <CgMenuLeftAlt className='text-2xl bg-yellow-500 rounded text-black hover:bg-yellow-400 transition ease-in duration-200 cursor-pointer'/>
          <p className='text-2xl font-semibold'>Muscle Guru</p>
        </div>
        <div className='flex items-center w-[50%] relative bg-white rounded-xl'>
            <input className='w-full px-4 py-1 text-black font-semibold rounded-s-xl outline-none' type='text' placeholder='Search Products , Categories, Brands and More'></input>
            <IoSearch className='bg-gray-200 text-4xl w-[8%] rounded-r-xl text-black cursor-pointer hover:scale-95
                    transition ease-in duration-200'/>
        </div>
        <div className='flex w-[15%] justify-start gap-10'>
          <div className='flex items-center gap-2'>
              <IoPersonCircle className='text-3xl'/>
              <p className='text-xl font-semibold'>Login</p>
          </div>
          <div className='flex items-center gap-2'>
              <FaShoppingCart className='text-3xl'/>
              <p className='text-lg font-semibold'>CART</p>
          </div>
        </div>


    </div>
  )
}

export default Header;