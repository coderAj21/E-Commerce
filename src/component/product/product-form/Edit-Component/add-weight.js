import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button, Input } from "rizzui";
import { weightSchema } from "../../../../types/types";
import APISERVICES from "../../../../config/api-services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import CustomLoader from "../../../custom-loader";

const AddWeight = ({ setOpen }) => {
  const methods = useForm({
    resolver: yupResolver(weightSchema),
    defaultValues: {
      weight: 0,
    },
  });
  const { setValue, handleSubmit, control,setError,formState:{errors} } = methods;
  const onSubmit = async (data) => {
    mutate(data);
  };
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await APISERVICES.weight.post(data);
      return res;
    },
    onSuccess: (data) => {
      if (data?.success) {
        setOpen(false);
        toast.success(data?.message);
      } else {
        setError("weight", { message: data?.message?.substring(0, 15) });
      }
      queryClient.invalidateQueries({
        queryKey: ["taxonomy"],
      });
    },
    onError(error) {
      toast.error(error.message);
      queryClient.invalidateQueries({
        queryKey: ["taxonomy"],
      });
    },
  });
  if (isPending) {
    return <CustomLoader />;
  }
  console.log(errors)
  return (
    <FormProvider {...methods}>
      <div>
        <p>Add Weight *</p>
        <div className="relative flex items-center gap-x-1">
          <Controller
            name="weight"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                type="number"
                placeholder="Enter the Weight"
                onChange={(evt)=>{
                  field.onChange(parseFloat(evt?.target?.value));
                }}
                className="my-4"
                error={error?.message}
              />
            )}
          />
          <Button onClick={handleSubmit(onSubmit)}>Add</Button>
        </div>
      </div>
    </FormProvider>
  );
};

export default AddWeight;
