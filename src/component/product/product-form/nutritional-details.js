import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Button, MultiSelect, Popover } from "rizzui";
import NutritionInput from "./nutrition-input";
import { FaPlus } from "react-icons/fa";
import AddNutritionValues from "./Edit-Component/add-nutrition";

const NutritionalDetailForm = ({ taxonomy }) => {
  const {
    watch,
    setValue,
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <div className="w-full relative h-full flex items-center gap-x-4 ">
        <Controller
          name="nutrition_arr"
          control={control}
          render={({ field }) => (
            <MultiSelect
              {...field}
              value={field.value || []}
              options={
                taxonomy?.nutrition?.map((item) => ({
                  value: item?.nutrition_id,
                  label: item?.value,
                })) || []
              }
              onChange={(option) => {
                const newValues = option.map((item) => ({
                  label: taxonomy?.nutrition?.find(
                    (nutritionItem) => nutritionItem.nutrition_id === item
                  )?.value,
                  value: "",
                  unit: "",
                }));

                setValue("nutrition", [...newValues]);

                return field.onChange(option);
              }}
              label="Choose Nutritional Values *"
              placeholder="Choose Value"
              error={errors?.category_name?.message}
            />
          )}
        />
        <div className="mt-6">
          <Popover placement="top">
            <Popover.Trigger>
              <Button
                onClick={(e) => e.stopPropagation()}
                className=""
                variant="solid"
              >
                <FaPlus className="size-5 text-white" />
              </Button>
            </Popover.Trigger>
            <Popover.Content>
              {({ setOpen }) => <AddNutritionValues setOpen={setOpen} />}
            </Popover.Content>
          </Popover>
        </div>
      </div>

      <div className="grid grid-cols-2 my-10 gap-5 ">
        {watch("nutrition").length > 0 &&
          watch("nutrition").map((item, index) => {
            return (
              <NutritionInput
                name="nutrition"
                index={index}
                obj={item}
                taxonomy={taxonomy}
              />
            );
          })}
      </div>
    </>
  );
};

export default NutritionalDetailForm;
