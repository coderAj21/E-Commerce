import {
  Input,
  Select,
  Textarea,
  Button,
  Checkbox,
  CheckboxGroup,
} from "rizzui";
import { countries_arr, states_arr } from "../config/constant";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import APISERVICES from "../config/api-services.js";
import { addressFormSchema } from "../types/types.js";
import { useAuth } from "../hooks/useAuth.js";

const defaultValue = {
  name: "",
  phone_number: "",
  pincode: "",
  country: "",
  address_line: "",
  city: "",
  state: "",
  landmark: "",
  alternatePhone: "",
  address_type: "home",
};



export const AddressForm = ({ setModalState }) => {
  const methods = useForm({
    defaultValues: defaultValue,
    resolver: yupResolver(addressFormSchema)
  });
  const {user}=useAuth();
  console.log(user);
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {
    mutate(data);
  };
   const { mutate } = useMutation({
     mutationFn: async (data) => {
      // console.log(data);
       const res = await APISERVICES.address.post(data,user.user_id);
       return res;
     },
     onSuccess: (data) => {
       toast.success(data.message);
     },
     onError(error, variables, context) {
       toast.error(error.message);
     },
   });

   console.log(errors);
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 bg-white rounded shadow-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Name *"
                variant="outline"
                error={errors.name?.message}
              />
            )}
          />
          <Controller
            name="phone_number"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                prefix="+91"
                maxLength={10}
                label="Phone Number *"
                variant="outline"
                error={errors.phone_number?.message}
              />
            )}
          />
          <Controller
            name="pincode"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                label="Pincode *"
                variant="outline"
                error={errors.pincode?.message}
              />
            )}
          />
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                onChange={(selected) => field.onChange(selected.value)}
                searchable
                label="Country *"
                options={countries_arr}
                error={errors.state?.message}
              />
            )}
          />
        </div>
        <Controller
          name="address_line"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              className="py-6"
              label="Address (Area and Street) *"
              variant="outline"
              error={errors.address_line?.message}
            />
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="City/District/Town *"
                variant="outline"
                error={errors.city?.message}
              />
            )}
          />
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                onChange={(selected) => field.onChange(selected.value)}
                searchable
                label="State *"
                options={states_arr}
                error={errors.state?.message}
              />
            )}
          />
          <Controller
            name="landmark"
            control={control}
            render={({ field }) => (
              <Input {...field} label="Landmark (Optional)" variant="outline" />
            )}
          />
          <Controller
            name="alternatePhone"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                prefix="+91"
                label="Alternate Phone (Optional)"
                variant="outline"
              />
            )}
          />
        </div>
        <div className="mt-6">
          <p className="font-medium mb-3">Address Type</p>
          <Controller
            name="address_type"
            control={control}
            render={({ field }) => (
              <CheckboxGroup
                values={[field.value]}
                onChange={(event) => {
                  field.onChange(event.target.value);
                }}
                setValues={(values) =>
                  setValue("address_type", values[0] || "")
                }
                className="flex flex-row gap-4"
              >
                <Checkbox label="Home" value="home" />
                <Checkbox label="Work" value="work" />
              </CheckboxGroup>
            )}
          />
        </div>
        <div className="mt-6 flex justify-between">
          <Button type="submit" variant="solid">
            Save
          </Button>
          <Button onClick={() => setModalState(false)} variant="outline">
            Cancel
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
