import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button, Input } from "rizzui";
import { titleSchema } from "../../../../types/types";
import APISERVICES from "../../../../config/api-services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CapitalCase } from "../../../../config/CapitalCase";

const CreateCategory = ({setOpen}) => {
  const methods = useForm({
    resolver: yupResolver(titleSchema),
    defaultValues: {
      title: "",
    },
  });
  const { setValue, handleSubmit, control,formState:{errors},setError } = methods;
  const onSubmit = async (data) => {
    mutate(data);
  };
  const queryClient=useQueryClient();
  const { mutate,isPending} = useMutation({
    mutationFn: async (data) => {
      data.title=CapitalCase(data?.title);
      const res = await APISERVICES.category.post(data);
      return res;
    },
    onSuccess: (data) => {
      if(data.success){
        setOpen(false);
        toast.success(data.message);
      }else{
        setError("title",{message:data?.message?.substring(0,15)});
      }
      queryClient.invalidateQueries({
        queryKey:["taxonomy"]
      })
    },
    onError(error) {
      toast.error(error.message);
      queryClient.invalidateQueries({
        queryKey: ["taxonomy"],
      });
    },
  });

  console.log(errors);
  
  return (
    <FormProvider {...methods}>
      <div >
        <p>Add New Category</p>
        <div className="relative flex items-center gap-x-1">
          <Controller
            name="title"
            control={control}
            rules={{ required: "Product name is required" }}
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                placeholder="Enter the Title"
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

export default CreateCategory;
