import * as yup from "yup";

export const addressFormSchema = yup
  .object({
    name: yup.string().required("Name is required"),
    phone_number: yup
      .string()
      .matches(/^\d{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),
    pincode: yup
      .string()
      .matches(/^\d{6}$/, "Pincode must be 6 digits")
      .required("Pincode is required"),
    country: yup.string().required("Country is required"),
    address_line: yup.string().required("Address is required"),
    city: yup.string().required("City/District/Town is required"),
    state: yup.string().required("State is required"),
    landmark: yup.string(),
    alternatePhone: yup
      .string()
      .matches(/^\d{10}$/, "Alternate phone must be 10 digits")
      .nullable(),
    address_type: yup
      .string()
      .oneOf(["home", "work"], "Address type must be either 'home' or 'work'")
      .required("Address type is required"),
  })
  .required();


export const passwordSchema = yup.object({
  oldPassword: yup.string().required("Old password is Required.."),
  newPassword: yup.string().required("New Password is Required.."),
  confirmPassword:yup.string().required("Confirm Password is required.."),
});
