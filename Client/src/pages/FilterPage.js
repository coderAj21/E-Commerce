import React, { useEffect, useState } from 'react'
import {Accordion, Button, Checkbox, CheckboxGroup, cn, Input,Select } from 'rizzui';
import RangeSlider from "../component/RangeSlider";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useSelector } from 'react-redux';
import ProductCard from '../component/ProductCard';
import { IoIosArrowDown } from 'react-icons/io';
import { useSearchParams } from 'react-router-dom';



const options = [
    { label: 'Name: A to Z', value: 'ascatoz' },
    { label: 'Name: Z to A', value: 'dscztoa' },
    { label: 'Price: Low to High', value: 'ascltoh' },
    { label: 'Price: High to Low', value: 'dschtol' },
];
const FilterPage = () => {
    const [searchparams]=useSearchParams();
    const [params,setParams]=useState({
      category_name:"",
      subCategory:"",
      brand_name:"",
      imported:"",
      sort:"",
    })
    
    const [value,setValue]=useState([]);
    const [state, setState] =useState({
      min: 2000,
      max: 8000,
    });

  function handleRangeChange(value) {
    setState({
      min: value[0],
      max: value[1],
    });
  }
  let data = useSelector((store) => store?.product?.data);
  let [product_arr, setProductArray] = useState([]);
  
  useEffect(() => {
    let obj=getQueryParameter(searchparams);
    console.log(obj);
    if(obj.value){
      let data_arr=data.filter((val)=>val[obj.key]===obj.value);
      console.log(data_arr);
      setProductArray(data_arr);

    }else{
      setProductArray(data);
    }
  }, [data])
  
  return (
    <div className="w-full flex min-h-screen  ">
      {/* all drop downs */}
      <div className="w-4/12 h-full">
        {/* price base  */}
        <Accordion className="w-10/12 my-2 py-3 border-b last-of-type:border-b-2">
          <Accordion.Header>
            {({ open }) => (
              <div className="w-full mx-auto p-1 px-4 flex items-center justify-between rounded-lg hover:bg-slate-50">
                <p className="text-lg font-semibold">Category</p>
                <span>
                  <IoIosArrowDown
                    className={cn(
                      "transition duration-300 ease-in",
                      open && "-rotate-180 transition duration-300 ease-in"
                    )}
                    size="25"
                  />
                </span>
              </div>
            )}
          </Accordion.Header>
          <Accordion.Body className="w-full my-2">
            <CheckboxGroup
              values={value}
              setValues={setValue}
              className="w-full flex flex-col gap-y-1"
            >
              <Checkbox
                className="hover:bg-slate-50 p-1 px-4 rounded-full"
                label="Protien"
                value="protein"
                variant="flat"
                labelClassName="px-2 text-lg"
              />
              <Checkbox
                className="hover:bg-slate-50 p-1 px-4 rounded-full"
                label="Gainer"
                value="gainer"
                variant="flat"
                labelClassName="px-2 text-lg"
              />
              <Checkbox
                className="hover:bg-slate-50 p-1 px-4 rounded-full"
                label="Creatine"
                value="creatine"
                variant="flat"
                labelClassName="px-2 text-lg"
              />
              <Checkbox
                className="hover:bg-slate-50 p-1 px-4 rounded-full"
                label="Vitamins"
                value="vitamins"
                variant="flat"
                labelClassName="px-2 text-lg"
              />
            </CheckboxGroup>
          </Accordion.Body>
        </Accordion>
        <Accordion className="w-10/12 my-2 py-3 border-b last-of-type:border-b-2">
          <Accordion.Header>
            {({ open }) => (
              <div className="w-full mx-auto p-1 px-4 flex items-center justify-between rounded-lg hover:bg-slate-50">
                <p className="text-lg font-semibold">Sub Category</p>
                <span>
                  <IoIosArrowDown
                    className={cn(
                      "transition duration-300 ease-in",
                      open && "-rotate-180 transition duration-300 ease-in"
                    )}
                    size="25"
                  />
                </span>
              </div>
            )}
          </Accordion.Header>
          <Accordion.Body className="w-full my-2">
            <CheckboxGroup
              values={value}
              setValues={setValue}
              className="w-full flex flex-col gap-y-1"
            >
              <Checkbox
                className="hover:bg-slate-50 p-1 px-4 rounded-full"
                label="Isolated"
                value="isolated"
                variant="flat"
                labelClassName="px-2 text-lg"
              />
              <Checkbox
                className="hover:bg-slate-50 p-1 px-4 rounded-full"
                label="Whey"
                value="whey"
                variant="flat"
                labelClassName="px-2 text-lg"
              />
              <Checkbox
                className="hover:bg-slate-50 p-1 px-4 rounded-full"
                label="Creatine"
                value="creatine"
                variant="flat"
                labelClassName="px-2 text-lg"
              />
              <Checkbox
                className="hover:bg-slate-50 p-1 px-4 rounded-full"
                label="Vitamins"
                value="vitamins"
                variant="flat"
                labelClassName="px-2 text-lg"
              />
            </CheckboxGroup>
          </Accordion.Body>
        </Accordion>
        {/* choose brands */}
        <Accordion className="w-10/12 my-2 py-3 border-b last-of-type:border-b-2">
          <Accordion.Header>
            {({ open }) => (
              <div className="w-full mx-auto p-1 px-4 flex items-center justify-between rounded-lg hover:bg-slate-50">
                <p className="text-lg font-semibold">Choose Brands</p>
                <span>
                  <IoIosArrowDown
                    className={cn(
                      "transition duration-300 ease-in",
                      open && "-rotate-180 transition duration-300 ease-in"
                    )}
                    size="25"
                  />
                </span>
              </div>
            )}
          </Accordion.Header>
          <Accordion.Body className="w-full my-2">
            <CheckboxGroup
              values={value}
              setValues={setValue}
              className="w-full flex flex-col gap-y-1"
            >
              <Checkbox
                className="hover:bg-slate-50 p-1 px-4 rounded-full"
                label="Muscle Blaze"
                value="muscleblaze"
                variant="flat"
                labelClassName="px-2 text-lg"
              />
              <Checkbox
                className="hover:bg-slate-50 p-1 px-4 rounded-full"
                label="Fit Foods"
                value="fitfoods"
                variant="flat"
                labelClassName="px-2 text-lg"
              />
              <Checkbox
                className="hover:bg-slate-50 p-1 px-4 rounded-full"
                label="HK Vitals"
                value="hkvitals"
                variant="flat"
                labelClassName="px-2 text-lg"
              />
              <Checkbox
                className="hover:bg-slate-50 p-1 px-4 rounded-full"
                label="Big Muscles"
                value="bigmuscles"
                variant="flat"
                labelClassName="px-2 text-lg"
              />
            </CheckboxGroup>
          </Accordion.Body>
        </Accordion>
        <Checkbox
          className="hover:bg-slate-50 p-1 px-4 my-4 rounded-full"
          label="Only Imported"
          value="onlyimported"
          variant="flat"
          labelClassName="px-2 text-lg"
        />
        {/* price */}
        <Accordion className="w-10/12 my-2 py-3 border-b last-of-type:border-b-2">
          <Accordion.Header>
            {({ open }) => (
              <div className="w-full mx-auto p-1 px-4 flex items-center justify-between rounded-lg hover:bg-slate-50">
                <p className="text-lg font-semibold">Price</p>
                <span>
                  <IoIosArrowDown
                    className={cn(
                      "transition duration-300 ease-in",
                      open && "-rotate-180 transition duration-300 ease-in"
                    )}
                    size="25"
                  />
                </span>
              </div>
            )}
          </Accordion.Header>
          <Accordion.Body className="w-full my-2 px-2">
            <div className='w-full'>
              <div className='w-full flex gap-x-4 px-6'>
                <Input
                  size='sm'
                  inputClassName="text-base"
                  suffixClassName="font-semibold text-lg"
                  value={state.min}
                  rounded="none"
                  suffix="Rs"
                  placeholder=""
                />
                <p className='text-2xl scale-150 font-semibold'>-</p>
                <Input
                  size='sm'
                  inputClassName='text-base'
                  suffixClassName="font-semibold text-lg"
                  value={state.max}
                  rounded='none'
                  suffix="Rs"
                  placeholder=""
                />
              </div>
              <RangeSlider
                range
                size="md"
                min={0}
                max={9999}
                value={[state.min, state.max]}
                onChange={(value) => handleRangeChange(value)}
                className="my-2 mt-4"
              />
            </div>
          </Accordion.Body>
        </Accordion>
      </div>
      {/* products */}
      <div className="w-full flex flex-col ">
        {/* search and drop downs */}
        <div className="w-full flex justify-between p-4">
          <Input
            suffix={<HiMagnifyingGlass className="w-4" />}
            placeholder="Search for products"
            onChange={(params) => {
              let arr = filterTheDataOnInputBases(params?.target?.value, [
                ...data,
              ]);
              setProductArray(arr);
            }}
          />
          <div className="w-1/2 flex items-center justify-end gap-x-4">
            <span>Sort By : </span>
            <Select
              className={"w-fit"}
              dropdownClassName="bg-white w-fit"
              options={options}
              value={value}
              onChange={(params) => {
                setValue(params);
                setProductArray(sortTheArray(params.value, [...data]));
              }}
              placeholder="Most Popular"
            />
          </div>
        </div>

        <div className="w-full flex flex-wrap gap-4 my-2">
          {product_arr?.map((val, idx) => {
            return (
              <ProductCard
                width="250px"
                key={"product" + idx}
                data={val}
                images={val.images}
                product_name={val.product_name}
                product_id={val.product_id}
                final_price={val.final_price}
                original_price={val.original_price}
                discount={val.discount}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FilterPage;

function sortTheArray(type,arr){
  let ans;
  if (type.includes("asc")){
    if(type.includes("atoz")){
      ans=arr.sort((a,b)=>{
        let s1=a.product_name.split(" ")[0];
        let s2=b.product_name.split(" ")[0];
        return s1.localeCompare(s2);
      })
    }else{
      ans = arr.sort((a, b) => {
        return a.final_price - b.final_price;
      })
    }
  }else{
    if(type.includes("htol")){
      ans = arr.sort((a, b) => {
        return b.final_price - a.final_price;
      })
    }else{
      ans = arr.sort((a, b) => {
        let s1 = a.product_name.split(" ")[0];
        let s2 = b.product_name.split(" ")[0];
        return s2.localeCompare(s1);
      })
    }
  }
  console.log(ans);
  return ans;
}

function filterTheDataOnInputBases(input,arr){
  if(!input)return arr;
  let num=Number(input);
  if(!isNaN(num)){
    return arr.filter((val)=>{
      return val.final_price<=num;
    })
  }
  return arr.filter((val)=>{
    let value=val?.product_name.split(" ")[0].toLowerCase();;
    return value.includes(input.toLowerCase());
  })
}

function getQueryParameter(searchparams){
  if (searchparams.get("category_name")!=="null"){
    return {
      key:"category_name",
      value: searchparams.get("category_name")
    }
  }
  else if (searchparams.get("brand_name")!=="null"){
    return {
      key: "brand_name",
      value: searchparams.get("brand_name")
    }
  }
  else if (searchparams.get("category_name")!=="null"){

  }
  else if (searchparams.get("category_name")!=="null"){

  }
  return {
    key:null,
    value:null
  }

}
