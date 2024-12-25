import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Input, Password } from "rizzui";
import { passwordSchema } from "../../types/types";

const PersonalInformation = () => {
  return (
    <div className="w-full h-full flex flex-col gap-y-5">
      <BasicDetails first_name={"Ashutosh"} last_name={"Joshi"} />
      <EmailDetails email="tosela7331@nozamas.com" />
      <PasswordDetails />
    </div>
  );
};

export default PersonalInformation;

const BasicDetails = ({ first_name = "", last_name = "" }) => {
  const [formData, setFromData] = useState({
    first_name: first_name,
    last_name: last_name,
  });
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div>
      <p className="text-xl font-sans font-semibold my-2">Basic Details</p>
      <div className="flex flex-wrap gap-x-6 items-center mt-6 my-3">
        <Input
          type="text"
          label="First Name"
          disabled={!isEdit}
          value={formData?.first_name}
          onChange={(e) =>
            setFromData({ ...formData, first_name: e.target.value })
          }
          variant="outline"
        />
        <Input
          type="text"
          label="Last Name"
          disabled={!isEdit}
          value={formData?.last_name}
          onChange={(e) =>
            setFromData({ ...formData, last_name: e.target.value })
          }
          variant="outline"
        />
        <Button
          className="mt-6 p-0 px-4 py-1"
          onClick={() => setIsEdit(!isEdit)}
        >
          {isEdit ? "Cancel" : "Edit"}
        </Button>
      </div>
      {isEdit && (
        <Button onClick={() => setIsEdit(!isEdit)} variant="outline">
          Save
        </Button>
      )}
    </div>
  );
};
const EmailDetails = ({ email = "" }) => {
  return (
    <div>
      <p className="text-xl font-sans font-semibold mt-6">Email Address</p>
      <div className="flex flex-wrap gap-x-6 items-center my-3">
        <Input
          className="w-1/5"
          type="text"
          label="Email"
          disabled={true}
          value={email}
          variant="outline"
        />
      </div>
    </div>
  );
};

const PasswordDetails = () => {
  const methods = useForm({
    resolver: yupResolver(passwordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = methods;
  const [isEdit, setIsEdit] = useState(false);

  const onSubmit = (data) => {
    console.log("Password data:", data);
    setIsEdit(false);
  };

  const handleEditToggle = () => {
    setIsEdit(!isEdit);
  };
  return (
    <div>
      <p className="text-xl font-sans font-semibold mt-6">Change Password</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap gap-x-6 my-3">
          {/* Old Password */}
          <Controller
            name="oldPassword"
            control={control}
            rules={{ required: "Old Password is required" }}
            render={({ field }) => (
              <Password
                {...field}
                className="w-1/5"
                label="Old Password"
                disabled={!isEdit}
                variant="outline"
                error={errors?.oldPassword?.message}
              />
            )}
          />

          {/* New Password */}
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <Password
                {...field}
                className="w-1/5"
                label="New Password"
                disabled={!isEdit}
                variant="outline"
                error={errors?.newPassword?.message}
              />
            )}
          />

          {/* Confirm Password */}
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Password
                {...field}
                className="w-1/5"
                label="Confirm Password"
                disabled={!isEdit}
                variant="outline"
                error={errors?.confirmPassword?.message}
              />
            )}
          />
        </div>

        <div className="flex gap-x-4">
          {isEdit && (
            <Button type="submit" variant="outline">
              Save
            </Button>
          )}
          <Button className="py-1" onClick={handleEditToggle}>
            {isEdit ? "Cancel" : "Edit"}
          </Button>
        </div>
      </form>
    </div>
  );
};
