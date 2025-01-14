import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Button, FileInput, Input, Popover, Select, Textarea } from "rizzui";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import CreateCategory from "./Edit-Component/create-category";
import CreateBrand from "./Edit-Component/create-brand";

const ProductDetailsForm = ({ taxonomy }) => {
  const {
    watch,
    setValue,
    formState: { errors },
    control,
  } = useFormContext();
  return (
    <>
      <Controller
        name="product_name"
        control={control}
        rules={{ required: "Product name is required" }}
        render={({ field }) => (
          <Input
            {...field}
            label="Product Name *"
            placeholder="Enter product name"
            className="my-4"
            error={errors.product_name?.message}
          />
        )}
      />
      <div className="grid grid-cols-2 gap-x-4 my-10">
        <Controller
          name="category_name"
          control={control}
          rules={{ required: "Category is required" }}
          render={({ field }) => (
            <div className="w-full relative ">
              <Select
                {...field}
                options={[
                  ...taxonomy?.category?.map((item) => ({
                    value: item.category_id,
                    label: item.category_name,
                  })),
                ]}
                onChange={(selected) => field.onChange(selected.value)}
                displayValue={(selected) => {
                  return (
                    taxonomy?.category?.find((r) => r.category_id === selected)
                      ?.category_name ?? ""
                  );
                }}
                label="Category *"
                className="relative"
                placeholder="Select category"
                error={errors.category_name?.message}
              />
              <div className="absolute bottom-0 right-0">
                <Popover placement="top">
                  <Popover.Trigger>
                    <Button
                      onClick={(e) => e.stopPropagation()}
                      className=""
                      variant="flat"
                    >
                      <FaPlus className="size-5 text-zinc-700" />
                    </Button>
                  </Popover.Trigger>
                  <Popover.Content>
                    {({ setOpen }) => <CreateCategory setOpen={setOpen} />}
                  </Popover.Content>
                </Popover>
              </div>
            </div>
          )}
        />
        <Controller
          name="brand"
          control={control}
          rules={{ required: "Brand is required" }}
          render={({ field, formState: { error } }) => (
            <div className="w-full relative ">
              <Select
                {...field}
                options={taxonomy?.brand?.map((item) => ({
                  value: item.brand_id,
                  label: item.brand_name,
                }))}
                displayValue={(selected) => {
                  return (
                    taxonomy?.brand?.find((r) => r.brand_id === selected)
                      ?.brand_name ?? ""
                  );
                }}
                onChange={(selected) => field.onChange(selected.value)}
                label="Brand *"
                placeholder="Select Brand"
                error={errors.brand?.message}
              />
              <div className="absolute bottom-0 right-0">
                <Popover placement="top">
                  <Popover.Trigger>
                    <Button
                      onClick={(e) => e.stopPropagation()}
                      className=""
                      variant="flat"
                    >
                      <FaPlus className="size-5 text-zinc-700" />
                    </Button>
                  </Popover.Trigger>
                  <Popover.Content>
                    {({ setOpen }) => <CreateBrand setOpen={setOpen} />}
                  </Popover.Content>
                </Popover>
              </div>
            </div>
          )}
        />
      </div>
      <Controller
        name="description"
        control={control}
        rules={{ required: "Description is required" }}
        render={({ field }) => (
          <Textarea
            {...field}
            label="Description"
            className="my-6"
            placeholder="Enter product description"
            error={errors.description?.message}
          />
        )}
      />
      <Controller
        name="product_image"
        control={control}
        rules={{ required: "At least one image is required" }}
        render={({ field }) => {
          return (
            <FileInput
              variant="texts"
              accept=".png,.jpg,.jpeg,.webp"
              onChange={(e) => field.onChange([...e.target.files])}
              className="w-fit"
              label="Product Image  *"
              multiple
              error={errors.product_image?.message}
            />
          );
        }}
      />

      <div className="w-full flex flex-wrap my-4">
        {watch("product_image")?.map((src, index) => {
          const imgSrc = URL.createObjectURL(src);
          return (
            <div key={"image"+index} className="relative max-w-[150px] m-2 shadow px-2 border rounded-lg">
              <div className="flex justify-between items-center">
                <p className="font-medium">Image {index + 1}</p>
                <Button
                  variant="text"
                  className="p-0"
                  onClick={() => {
                    let arr = watch("product_image");
                    arr = arr.filter((item, idx) => idx !== index);
                    setValue("product_image", arr);
                  }}
                >
                  <RiDeleteBin5Line className="size-5 text-red-500 hover:scale-105 transition duration-200" />
                </Button>
              </div>
              <img
                className="w-full aspect-square rounded-md mb-2 "
                key={index}
                src={imgSrc}
                alt="product"
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductDetailsForm;
