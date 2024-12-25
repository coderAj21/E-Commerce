import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Button, FileInput, Input, Select } from "rizzui";
import { RiDeleteBin5Line } from "react-icons/ri";
import ModalButton from "../modal-button.js";

const ProductDetailsForm = ({ taxonomy }) => {
  const {
    watch,
    setValue,
    formState: { errors },
    control,
  } = useFormContext();

  // console.log(watch());

  return (
    <>
      <div className="grid grid-cols-3 gap-x-4 my-10">
        <Controller
          name="product_name"
          control={control}
          rules={{ required: "Product name is required" }}
          render={({ field }) => (
            <Input
              {...field}
              label="Product Name *"
              placeholder="Enter product name"
              error={errors.product_name?.message}
            />
          )}
        />
        <Controller
          name="category_name"
          control={control}
          rules={{ required: "Category is required" }}
          render={({ field }) => (
            <Select
              {...field}
              options={[
                ...taxonomy?.category?.map((item) => ({
                  value: item.category_id,
                  label: item.category_name,
                })),
                { label: "Add Category", value: "addmore" },
              ]}
              onChange={(selected) => field.onChange(selected.value)}
              displayValue={(selected) => {
                return (
                  taxonomy?.category?.find((r) => r.category_id == selected)
                    ?.category_name ?? ""
                );
              }}
              getOptionDisplayValue={(option) => {
                return option.value === "addmore" ? (
                  <ModalButton
                    text="Add Category"
                    heading="Add Category"
                    view={<div>Hello ji</div>}
                  />
                ) : (
                  <p>{option.label}</p>
                );
              }}
              label="Category *"
              placeholder="Select category"
              error={errors.category_name?.message}
            />
          )}
        />
        <Controller
          name="brand"
          control={control}
          rules={{ required: "Brand is required" }}
          render={({ field }) => (
            <Select
              {...field}
              options={taxonomy?.brand?.map((item) => ({
                value: item.brand_id,
                label: item.brand_name,
              }))}
              onChange={(selected) => field.onChange(selected.value)}
              label="Brand *"
              placeholder="Select Brand"
              error={errors.brand?.message}
            />
          )}
        />
      </div>
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
            <div className="relative w-[150px] m-2 shadow p-2 border ">
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
                className="w-full aspect-square rounded "
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
