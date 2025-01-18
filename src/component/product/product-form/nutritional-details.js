import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Button, Checkbox, MultiSelect, Popover } from "rizzui";
import NutritionInput from "./nutrition-input";
import { FaPlus } from "react-icons/fa";
import AddNutritionValues from "./Edit-Component/add-nutrition";
import { RxCross2 } from "react-icons/rx";

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
          name="nutrition"
          control={control}
          render={({ field }) => {
            const custom_options =
              taxonomy?.nutrition?.map((item) => ({
                value: item?.nutrition_id,
                label: item?.value,
                unit: "",
                nutrition_id: item?.nutrition_id,
              })) || [];
            function renderDisplayValue(selectedOptions) {
              return (
                <div className="flex flex-wrap gap-2 w-full">
                  {selectedOptions?.map((item) => {
                    let data = custom_options.find(
                      (r) => r.nutrition_id === item.nutrition_id
                    );
                    return (
                      <p className="flex items-center gap-x-2 px-1 border rounded-md">
                        <span className="text-sm">{data?.label}</span>
                        <RxCross2
                          onClick={(e) => {
                            e.stopPropagation();

                            let arr = selectedOptions.filter(
                              (item) => item.nutrition_id !== data.nutrition_id
                            );
                            setValue("nutrition", arr);
                          }}
                        />
                      </p>
                    );
                  })}
                </div>
              );
            }
            return (
              <MultiSelect
                {...field}
                value={field.value || []}
                options={custom_options}
                displayValue={renderDisplayValue}
                getOptionDisplayValue={(option) => {
                  const isSelected = field.value?.some(
                    (selectedOption) =>
                      selectedOption?.nutrition_id === option?.nutrition_id
                  );
                  return (
                    <div className="flex gap-x-2">
                      <Checkbox readOnly checked={isSelected} />
                      <span>{option.label}</span>
                    </div>
                  );
                }}
                onChange={(selected) => {
                  if (selected.length > 1) {
                    let check = selected.at(-1);
                    let prevLength = selected.length;
                    selected = selected.filter(
                      (item) => item?.nutrition_id !== check
                    );
                    if (prevLength !== selected.length) selected.pop();
                  }
                  let arr = custom_options.filter((item) =>
                    selected.some((sel) => {
                      let val = sel?.nutrition_id ? sel?.nutrition_id : sel;
                      return val === item.nutrition_id;
                    })
                  );
                  field.onChange(arr);
                }}
                label="Choose Nutritional Values *"
                placeholder="Choose Value"
                error={errors?.nutrition?.message}
              />
            );
          }}
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
