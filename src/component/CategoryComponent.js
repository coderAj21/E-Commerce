import React, { useEffect, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io';
import { NavLink } from 'react-router-dom';
import { Button, Dropdown, Title } from 'rizzui';
import { routes } from "../config/routes";
import APISERVICES from '../config/api-services';
const CategoryComponent = () => {
    const [data,setData]=useState([]);
    
    async function fetchApi(){
        let response = await APISERVICES.category.get();
        if (response.success){
            setData(response.data);
        }
    }

    useEffect(()=>{
        fetchApi();
    },[])
    if(data.length<1)return <>Loading....</>
  return (
    <>
      <Dropdown className={"shadow-md"}> 
        <Dropdown.Trigger>
          <Button className="" variant="solid">
            <p className="flex items-center text-sm text-white font-semibold">
              Products <IoIosArrowDown className="text-xl" />
            </p>
          </Button>
        </Dropdown.Trigger>
        <Dropdown.Menu className="bg-white w-10/12 flex gap-x-10">
          <div className='flex flex-col '>
            <Title as="h6">Proteins</Title>
            <Dropdown.Item>Whey Protein</Dropdown.Item>
            <Dropdown.Item>Casein Protein</Dropdown.Item>
            <Dropdown.Item>Isolated Protein</Dropdown.Item>
            <Dropdown.Item>Whey Isolated Protein</Dropdown.Item>
          </div>
          <div className='flex flex-col '>
            <Title as="h6">Gainer</Title>
            <Dropdown.Item>Mass Gainer</Dropdown.Item>
            <Dropdown.Item>Weight Gainer</Dropdown.Item>
            <Dropdown.Item>Herbal Weight Protein</Dropdown.Item>
          </div>
          <div className='flex flex-col '>
            <Title as="h6">Brands</Title>
            <Dropdown.Item>Big Muscle</Dropdown.Item>
            <Dropdown.Item>Muslce Blaze</Dropdown.Item>
            <Dropdown.Item>Hk Vitals</Dropdown.Item>
            <Dropdown.Item>Muscle Tech</Dropdown.Item>
          </div>
          <div className='flex flex-col '>
            <Title as="h6">Workout Essentials</Title>
            <Dropdown.Item>Pre Workout</Dropdown.Item>
            <Dropdown.Item>Post Workout</Dropdown.Item>
            <Dropdown.Item>Vitamins</Dropdown.Item>
            <Dropdown.Item>Omega/Fish Oil</Dropdown.Item>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default CategoryComponent;