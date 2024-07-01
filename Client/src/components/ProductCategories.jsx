import React from 'react'
import ProductType from '../cards/ProductType';
import { data } from '../utils/Data';

const ProductCategories = () => {
  return (
    <div className='m-2 mx-1/2 flex flex-row gap-4 justify-evenly'>
        {
            data.map((Element,index)=>{
                return <ProductType key={index} image={Element.image} name={Element.name}/>
            })
        }
    </div>
  )
}

export default ProductCategories