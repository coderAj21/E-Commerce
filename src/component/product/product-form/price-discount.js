import React from "react";
import { Controller, set, useFormContext } from "react-hook-form";
import { Badge, Input, Text } from "rizzui";

const PriceDiscountComponent = ({ name, index, taxonomy }) => {
  const {
    watch,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="w-full grid grid-cols-4 items-center gap-4 border-b">
      <div className="">
        <Text className="text-sm font-medium leading-5 my-1">
          Weight in{" "}
          {watch("unit_id") &&
            taxonomy?.unit.find((item) => item.unit_id === watch("unit_id"))
              .value}{" "}
        </Text>
        <Badge rounded="sm" variant="outline" className="text-sm px-8 min-w-32">
          {watch(`${name}[${index}].label`)}{" "}
          {watch("unit_id") &&
            taxonomy?.unit.find((item) => item.unit_id === watch("unit_id"))
              .value}
        </Badge>
      </div>
      <Controller
        name={`${name}[${index}].original_price`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            type="number"
            label="Original Price*"
            placeholder="Enter the Base Price"
            onChange={(evt) => {
              let val=parseFloat(evt.target.value);
              field.onChange(val);
              let base_price = watch(`${name}[${index}].original_price`);
              let discount = watch(`${name}[${index}].discount`);
              let final_price = parseFloat(
                (base_price * (1 - discount / 100)).toFixed(2)
              );
              setValue(`${name}[${index}].final_price`, final_price);
            }}
            className="my-4"
            error={error?.message}
          />
        )}
      />
      <Controller
        name={`${name}[${index}].discount`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            type="number"
            label="Discount % *"
            onChange={(evt) => {
              let val = parseFloat(evt.target.value);
              if (val >= 0 && val < 100) {
                field.onChange(val);
              } else if (val > 100) {
                field.onChange(100);
              } else {
                field.onChange("");
              }
              let base_price = watch(`${name}[${index}].original_price`);
              let discount = watch(`${name}[${index}].discount`);
              let final_price = parseFloat(
                (base_price * (1 - discount / 100)).toFixed(2)
              );
              setValue(`${name}[${index}].final_price`, final_price);
            }}
            className="my-4"
            error={error?.message}
          />
        )}
      />
      <Controller
        name={`${name}[${index}].final_price`}
        control={control}
        render={({ field, fieldState: { error } }) => {
          return (
            <Input
              {...field}
              disabled
              value={watch(`${name}[${index}].final_price`)}
              label="Final Price*"
              className="my-4"
              error={error?.message}
            />
          );
        }}
      />
    </div>
  );
};

export default PriceDiscountComponent;
