import React from 'react'
import { NavLink } from 'react-router-dom';

const EmptyPage = ({head1,head2}) => {
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center '>
        <p className='text-4xl font-semibold my-2 tracking-wide font-serif'>{head1}</p>
        <p>{head2}</p>
        <NavLink to={"/"} >
            <button
                className="rounded-md bg-yellow-300 text-black font-semibold p-2 px-8
                 hover:bg-yellow-400 transition duration-150 ease-in my-2 text-xl">
                Start Shopping
            </button>
        </NavLink>
    </div>
  )
}

export default EmptyPage;