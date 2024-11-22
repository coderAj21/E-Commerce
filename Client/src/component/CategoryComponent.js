import React, { useEffect, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io';
import { NavLink } from 'react-router-dom';
import { Dropdown } from 'rizzui';
import { routes } from "../config/routes";
const CategoryComponent = () => {
    const [data,setData]=useState([]);
    
    async function fetchApi(){
        let data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/get_category`);
        let response=await data.json();
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
          <Dropdown>
              <Dropdown.Trigger>
                  <p className="flex items-center text-sm text-zinc-500 font-semibold">Supplements <IoIosArrowDown className="text-xl" /></p>
              </Dropdown.Trigger>
              <Dropdown.Menu className="bg-white w-fit">
                {
                    data.length>0 && data.map((val,idx)=>{
                        return <NavLink key={"catergory" + idx} to={routes.filter.listing(val?.category_name.toLowerCase())}>
                            <Dropdown.Item key={"catergory" + idx}>{val.category_name}</Dropdown.Item>
                        </NavLink>
                    })
                }
              </Dropdown.Menu>
          </Dropdown>  
    </>
  )
}

export default CategoryComponent;