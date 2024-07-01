import React from 'react'

const ProductType = ({image,name}) => {
  return (
    <div className='flex flex-col w-[90px] aspect-sqaure gap-1 items-center hover:scale-95 cursor-pointer transition ease-in duration-200'>
        <img className='w-[100%] rounded-lg' src={image}></img>
        <p className='text-sm font-semibold'>{name}</p>
    </div>
  )
}

export default ProductType