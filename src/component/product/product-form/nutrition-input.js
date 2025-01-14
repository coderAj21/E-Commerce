import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input, Select } from "rizzui";

const NutritionInput = ({ name, index, obj, taxonomy }) => {
  const {
    watch,
    setValue,
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      name={`${name}[${index}]`}
      control={control}
      render={({ field }) => (
        <Input
          {...field}
          value={watch(`${name}[${index}].value`)}
          onChange={(evt) => {
            setValue(`${name}[${index}].value`, parseFloat(evt?.target?.value));
          }}
          type="number"
          label={obj.label}
          error={errors.nutrition?.message}
          inputClassName="p-0 pl-2"
          suffix={
            <Controller
              name={`${name}[${index}].unit`}
              control={control}
              rules={{ required: "unit is required" }}
              render={({ field }) => (
                <Select
                  className="w-32"
                  {...field}
                  options={taxonomy?.unit?.map((item) => ({
                    value: item.unit_id,
                    label: item.value,
                  }))}
                  displayValue={(selected) => {
                    return (
                      taxonomy?.unit?.find((r) => r.unit_id === selected)
                        ?.value ?? ""
                    );
                  }}
                  onChange={(selected) =>
                    setValue(`${name}[${index}].unit`, selected.value)
                  }
                  placeholder="Select Unit"
                  error={errors.unit?.message}
                />
              )}
            />
          }
        />
      )}
    />
  );
};

export default NutritionInput;
