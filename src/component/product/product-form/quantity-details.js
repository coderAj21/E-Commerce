import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { Button, Checkbox, MultiSelect, Popover, Select } from "rizzui";
import PriceDiscountComponent from "./price-discount";
import AddFlavour from "./Edit-Component/create-flavour";
import { FaPlus } from "react-icons/fa";
import AddUnit from "./Edit-Component/add-unit";
import AddWeight from "./Edit-Component/add-weight";

const QuantityDetailsForm = ({ taxonomy }) => {
  const {
    watch,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();
  // console.log(watch("weight"));
  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-2 gap-5 my-1 mt-10">
        <Controller
          name="flavour"
          control={control}
          rules={{ required: "Flavour is required" }}
          render={({ field, formState: { error } }) => (
            <div className="w-full relative ">
              <MultiSelect
                {...field}
                value={field.value || []}
                options={
                  taxonomy?.flavour?.map((item) => ({
                    value: item?.flavour_id,
                    label: item?.value,
                  })) || []
                }
                label="Choose Flavour *"
                placeholder="Select Flavour"
                error={error?.message}
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
                    {({ setOpen }) => <AddFlavour setOpen={setOpen} />}
                  </Popover.Content>
                </Popover>
              </div>
            </div>
          )}
        />
        <Controller
          name="unit_id"
          control={control}
          rules={{ required: "unit is required" }}
          render={({ field, formState: { error } }) => (
            <div className="w-full relative ">
              <Select
                label="Choose Unit"
                className="w-full"
                {...field}
                options={taxonomy?.unit?.map((item) => ({
                  value: item.unit_id,
                  label: item.value,
                })) || []}
                displayValue={(selected) => {
                  return (
                    taxonomy?.unit?.find((r) => r.unit_id === selected)?.value ??
                    ""
                  );
                }}
                onChange={(selected) => field.onChange(selected.value)}
                placeholder="Select Unit"
                error={error?.message}
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
                    {({ setOpen }) => <AddUnit setOpen={setOpen} />}
                  </Popover.Content>
                </Popover>
              </div>
            </div>
          )}
        />
        <Controller
          name="weight"
          control={control}
          rules={{ required: "Weight is required" }}
          render={({ field }) => {
            const custom_options =
              taxonomy?.weight?.map((item) => ({
                value: item?.weight_id,
                label: item?.value + "",
                original_price: 0,
                discount: 0,
                final_price: 0,
              })) || [];
            function renderDisplayValue(selectedOptions) {
              return (
                <div className="flex flex-wrap gap-2 w-full">
                  {selectedOptions?.map((item) => {
                    let data = custom_options.find(
                      (r) => r.value === item.value
                    );
                    return (
                      <p className="flex items-center gap-x-2 px-1 border rounded-md">
                        <span className="text-sm">{data?.label}</span>
                        <RxCross2
                          onClick={(e) => {
                            e.stopPropagation();
                            let arr = selectedOptions.filter(
                              (item) => item.value !== data.value
                            );
                            setValue("weight", arr);
                          }}
                        />
                      </p>
                    );
                  })}
                </div>
              );
            }
            return (
              <div className="w-full relative ">
                <MultiSelect
                  {...field}
                  value={field.value || []}
                  options={custom_options}
                  displayValue={renderDisplayValue}
                  getOptionDisplayValue={(option) => {
                    const isSelected = field.value?.some(
                      (selectedOption) => selectedOption.value === option.value
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
                        (item) => item.value !== check
                      );
                      if (prevLength !== selected.length) selected.pop();
                    }
                    let arr = custom_options.filter((item) =>
                      selected.some((sel) => {
                        let val = sel?.value ? sel?.value : sel;
                        return val === item.value;
                      })
                    );
                    field.onChange(arr);
                  }}
                  label="Choose Weight *"
                  placeholder="Select Weight"
                  error={errors?.weight?.message}
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
                      {({ setOpen }) => <AddWeight setOpen={setOpen} />}
                    </Popover.Content>
                  </Popover>
                </div>
              </div>
            );
          }}
        />
      </div>
      <div className="w-full flex flex-col">
        {watch("weight").length > 0 &&
          watch("weight")?.map((item, idx) => {
            return (
              <PriceDiscountComponent
                key={"weight" + idx}
                name={"weight"}
                index={idx}
                taxonomy={taxonomy}
              />
            );
          })}
      </div>
    </div>
  );
};

export default QuantityDetailsForm;
