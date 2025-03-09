import {
  Input,
  Select,
  Textarea,
  Button,
  Checkbox,
  CheckboxGroup,
} from "rizzui";
import { states_arr } from "../config/constant";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import APISERVICES from "../config/api-services.js";
import { addressFormSchema } from "../types/types.js";
import { useAuth } from "../hooks/useAuth.js";
import { useModal } from "../utilities/model/use-model.js";

export const AddressForm = ({ data, id }) => {
  const { user } = useAuth();
  const methods = useForm({
    defaultValues: {
      address_id: id ? data?.address_id : "",
      user_id: user?.user_id,
      name: id ? data?.name : "",
      phone_number: id ? data?.phone_number : "",
      pincode: id ? data?.pincode : "",
      country: "India",
      address_line: id ? data?.address_line : "",
      city: id ? data?.city : "",
      state: id ? data?.state : "",
      landmark: id ? data?.landmark : "",
      alternatePhone: id ? data?.alternatePhone : "",
      address_type: id ? data?.address_type : "home",
    },
    resolver: yupResolver(addressFormSchema),
  });
  const { closeModal } = useModal();
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    setError,
    clearErrors,
  } = methods;

  const onSubmit = (data) => {
    mutate(data);
  };

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = id
        ? await APISERVICES.user.put(`/address/${user?.user_id}`, data)
        : await APISERVICES.user.post(data, `/address/${user?.user_id}`);
      return res;
    },
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data.message);
        closeModal();
      } else {
        toast.error(data?.message);
      }
      queryClient.invalidateQueries({
        queryKey: ["address-listing"],
      });
    },
    onError(error, variables, context) {
      toast.error(error.message);
      queryClient.invalidateQueries({
        queryKey: ["address-listing"],
      });
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
                onChange={(evt) => {
                  let val = evt.target.value;
                  clearErrors("phone_number");
                  if (!/^\d{10}$/.test(val)) {
                    setError("phone_number", {
                      message: "Mobile number must be 10 digits",
                    });
                  }
                  field.onChange(val);
                }}
                label="Phone Number *"
                variant="outline"
                error={errors.phone_number?.message}
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
            name="pincode"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                label="Pincode *"
                onChange={(evt) => {
                  let val = evt?.target?.value?.trim();
                  clearErrors("pincode");
                  if (!/^\d{6}$/.test(val)) {
                    setError("pincode", {
                      message: "Pincode must be 6 digits",
                    });
                  }
                  field.onChange(val);
                }}
                variant="outline"
                error={errors.pincode?.message}
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
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                type="number"
                prefix="+91"
                maxLength={10}
                onChange={(evt) => {
                  let val = evt?.target?.value?.trim();
                  clearErrors("alternatePhone");
                  if (!/^\d{10}$/.test(val)) {
                    setError("alternatePhone", {
                      message: "Mobile number must be 10 digits",
                    });
                  }
                  field.onChange(val);
                }}
                label="Alternate Phone (Optional)"
                variant="outline"
                error={error?.message}
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
          {errors?.address_type?.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors?.address_type?.message}
            </p>
          )}
        </div>
        <div className="w-full mt-6 flex justify-between">
          <Button
            className="min-w-[200px]"
            onClick={closeModal}
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            isLoading={isPending}
            className="min-w-[200px]"
            type="submit"
            variant="solid"
          >
            Save
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
