import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Input, MultiSelect } from 'rizzui';

const QuantityDetailsForm = ({taxonomy}) => {
    const {watch,control,formState:{errors}}=useFormContext();
  return (
    <div className="grid grid-cols-2 gap-10 my-10">
      <Controller
        name="original_price"
        control={control}
        rules={{ required: "Original price is required" }}
        render={({ field }) => (
          <Input
            {...field}
            type="number"
            label="Original Price *"
            placeholder="Enter original price"
            error={errors.original_price?.message}
          />
        )}
      />
      <Controller
        name="final_price"
        control={control}
        rules={{ required: "Final price is required" }}
        render={({ field }) => (
          <Input
            {...field}
            type="number"
            label="Final Price  *"
            placeholder="Enter final price"
            error={errors.final_price?.message}
          />
        )}
      />
      <Controller
        name="discount"
        control={control}
        rules={{ required: "Discount is required" }}
        render={({ field }) => (
          <Input
            {...field}
            type="number"
            label="Discount % *"
            placeholder="Enter discount"
            error={errors.discount?.message}
          />
        )}
      />
      <Controller
        name="quantity"
        control={control}
        rules={{ required: "Quantity is required" }}
        render={({ field }) => (
          <Input
            {...field}
            type="number"
            label="Quantity  *"
            placeholder="Enter quantity"
            error={errors.quantity?.message}
          />
        )}
      />
      <Controller
        name="flavour"
        control={control}
        rules={{ required: "Flavour is required" }}
        render={({ field }) => (
          <MultiSelect
            {...field}
            value={watch("flavour") || []}
            options={
              taxonomy?.flavour?.map((item) => ({
                value: item?.flavour_id,
                label: item?.value,
              })) || []
            }
            label="Choose Flavour *"
            placeholder="Select Flavour"
            error={errors?.category_name?.message}
          />
        )}
      />

      <Controller
        name="weight"
        control={control}
        rules={{ required: "Weight is required" }}
        render={({ field }) => (
          <Input
            {...field}
            type="number"
            step="0.01"
            label="Weight  *"
            placeholder="Enter weight"
            error={errors.weight?.message}
          />
        )}
      />
    </div>
  );
}

export default QuantityDetailsForm