import React, { useEffect, useState } from "react";
import { Accordion, Checkbox, CheckboxGroup, cn, Input, Select } from "rizzui";
import RangeSlider from "../../../component/RangeSlider";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowDown } from "react-icons/io";
import ProductCard from "../../../component/product/ProductCard";
import { fetchTaxonomy } from "../../../redux/slices/taxonomySlice";
import CustomLoader from "../../../component/custom-loader";

const options = [
  { label: "Name: A to Z", value: "ascatoz" },
  { label: "Name: Z to A", value: "dscztoa" },
  { label: "Price: Low to High", value: "ascltoh" },
  { label: "Price: High to Low", value: "dschtol" },
];

const Filter = ({ obj, urlHandler }) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState(obj);
  const { data: taxonomy, loading } = useSelector((store) => store?.taxonomy);
  const [selectData, setSelectData] = useState(null);

  let [product_arr, setProductArray] = useState([]);
  function handleRangeChange(value) {
    urlHandler({ minPrice: value[0], maxPrice: value[1] });
    setQuery((prev) => {
      return { ...prev, minPrice: value[0], maxPrice: value[1] };
    });
  }
  let data = useSelector((store) => store?.product?.data);

  useEffect(() => {
    dispatch(fetchTaxonomy());
  }, [dispatch]);

  useEffect(() => {
    if (data.length > 0) setProductArray([...data]);
  }, [data]);

  if (loading) return <CustomLoader />;
  // console.log(query);
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
          <Accordion.Body className="w-full flex flex-col gap-y-1 my-2">
            {taxonomy?.category?.map((item, idx) => {
              return (
                <Checkbox
                  key={"category" + idx}
                  className="hover:bg-slate-50 p-1 px-4 rounded-full"
                  label={item?.category_name}
                  defaultValue={item?.category_id}
                  variant="flat"
                  labelClassName="px-2 text-lg"
                  defaultChecked={item?.category_id == query?.category_id}
                  onClick={() => {
                    let val = item?.category_id;
                    if (query.category_id == item?.category_id) val = "";
                    urlHandler({ category_id: val });
                    return setQuery((prev) => {
                      return { ...prev, category_id: val };
                    });
                  }}
                />
              );
            })}
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
          <Accordion.Body className="w-full flex flex-col gap-y-1 my-2">
            <Checkbox
              className="hover:bg-slate-50 p-1 px-4 rounded-full"
              label="Isolated"
              defaultValue="isolated"
              variant="flat"
              labelClassName="px-2 text-lg"
            />
            <Checkbox
              className="hover:bg-slate-50 p-1 px-4 rounded-full"
              label="Whey"
              defaultValue="whey"
              variant="flat"
              labelClassName="px-2 text-lg"
            />
            <Checkbox
              className="hover:bg-slate-50 p-1 px-4 rounded-full"
              label="Creatine"
              defaultValue="creatine"
              variant="flat"
              labelClassName="px-2 text-lg"
            />
            <Checkbox
              className="hover:bg-slate-50 p-1 px-4 rounded-full"
              label="Vitamins"
              defaultValue="vitamins"
              variant="flat"
              labelClassName="px-2 text-lg"
            />
          </Accordion.Body>
        </Accordion>
        {/* choose brands */}
        <Accordion className="w-10/12 my-2 py-3 border-b last-of-type:border-b-2">
          <Accordion.Header>
            {({ open }) => (
              <div className="w-full mx-auto p-1 px-4 flex items-center justify-between rounded-lg hover:bg-slate-50">
                <p className="text-lg font-semibold">Brands</p>
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
          <Accordion.Body className="w-full flex flex-col gap-y-1 my-2">
            {taxonomy?.brand?.map((item, idx) => {
              return (
                <Checkbox
                  key={"brand" + idx}
                  className="hover:bg-slate-50 p-1 px-4 rounded-full"
                  label={item?.brand_name}
                  defaultValue={item?.brand_id}
                  variant="flat"
                  labelClassName="px-2 text-lg"
                  defaultChecked={
                    query?.brand_id && item?.brand_id === query?.brand_id
                  }
                  onClick={() => {
                    let val = item?.brand_id;
                    if (query.brand_id == item?.brand_id) val = "";
                    urlHandler({ brand_id: val });
                    return setQuery((prev) => {
                      return { ...prev, brand_id: val };
                    });
                  }}
                />
              );
            })}
          </Accordion.Body>
        </Accordion>
        <Checkbox
          className="hover:bg-slate-50 p-1 px-4 my-4 rounded-full"
          label="Only Imported"
          value={query.imported}
          onChange={(evt) => {
            setQuery((prev) => ({
              ...prev,
              import: evt?.target?.checked,
            }));
            urlHandler({ imported: evt?.target?.checked });
          }}
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
            <div className="w-full">
              <div className="w-full flex gap-x-4 px-4">
                <Input
                  size="sm"
                  inputClassName="text-base w-full"
                  suffixClassName="font-semibold text-lg"
                  value={parseFloat(query?.minPrice)}
                  readOnly
                  rounded="none"
                  suffix="Rs"
                  placeholder=""
                />
                <p className="text-2xl scale-150 font-semibold">-</p>
                <Input
                  size="sm"
                  inputClassName="text-base w-full"
                  suffixClassName="font-semibold text-lg"
                  value={parseFloat(query?.maxPrice)}
                  readOnly
                  rounded="none"
                  suffix="Rs"
                  placeholder=""
                />
              </div>
              <RangeSlider
                range
                size="md"
                min={0}
                max={20000}
                value={[
                  parseFloat(query?.minPrice),
                  parseFloat(query?.maxPrice),
                ]}
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
        <div className="w-full flex justify-between py-4">
          <Input
            suffix={<HiMagnifyingGlass className="w-4 size-7" />}
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
              value={selectData}
              onChange={(field) => {
                setSelectData(field);
                setProductArray(sortTheArray(field.value, [...data]));
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
};

export default Filter;

function sortTheArray(type, arr) {
  let ans;
  if (type.includes("asc")) {
    if (type.includes("atoz")) {
      ans = arr.sort((a, b) => {
        let s1 = a.product_name.split(" ")[0];
        let s2 = b.product_name.split(" ")[0];
        return s1.localeCompare(s2);
      });
    } else {
      ans = arr.sort((a, b) => {
        return a.final_price - b.final_price;
      });
    }
  } else {
    if (type.includes("htol")) {
      ans = arr.sort((a, b) => {
        return b.final_price - a.final_price;
      });
    } else {
      ans = arr.sort((a, b) => {
        let s1 = a.product_name.split(" ")[0];
        let s2 = b.product_name.split(" ")[0];
        return s2.localeCompare(s1);
      });
    }
  }
  return ans;
}

function filterTheDataOnInputBases(input, arr) {
  if (!input) return arr;
  let num = Number(input);
  if (!isNaN(num)) {
    return arr.filter((val) => {
      return val.final_price <= num;
    });
  }
  return arr.filter((val) => {
    let value = val?.product_name.split(" ")[0].toLowerCase();
    return value.includes(input.toLowerCase());
  });
}
