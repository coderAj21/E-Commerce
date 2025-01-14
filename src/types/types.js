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
  confirmPassword: yup.string().required("Confirm Password is required.."),
});




export const formSchema = yup.object().shape({
  product_name: yup.string().required("Product name is required."),
  description: yup.string().required("Description is required."),
  category_name: yup.number().required("Category name is required."),
  brand: yup.number().required("Brand is required."),
  flavour: yup.array().of(yup.number().required("Flavour must be a string.")), // Array of strings
  weight: yup.array().of(yup.number().required("Weight must be a string.")), // Array of strings
  product_image: yup
    .array()
    .of(yup.mixed().required("Each image must be a file.")), // Array of filesS
  unit: yup
    .number()
    .typeError("Unit must be a number.")
    .required("Unit is required."),
  nutrition_arr: yup
    .array()
    .of(yup.number().required("Nutrition array must contain numbers.")), // Array of numbers
  nutrition: yup.array().of(
    yup.object().shape({
      label: yup.string().required("Nutrition name is required."),
      value: yup.number().required("Nutrition value is required."),
      unit: yup.number().required("Nutrition Unit is required."),
    }) // Array of objects with name and value fields
  ),
});

export const titleSchema=yup.object({
  title:yup.string().required("Title is required...")
})

export const weightSchema = yup.object({
  weight: yup.number().required("Weight is required..."),
});

// original_price: yup
//     .number()
//     .typeError("Original price must be a number.")
//     .positive("Original price must be a positive number.")
//     .required("Original price is required."),
//   final_price: yup
//     .number()
//     .typeError("Final price must be a number.")
//     .positive("Final price must be a positive number.")
//     .required("Final price is required."),
//   discount: yup
//     .number()
//     .typeError("Discount must be a number.")
//     .min(0, "Discount cannot be negative.")
//     .max(100, "Discount cannot exceed 100%"),
//   quantity: yup
//     .number()
//     .typeError("Quantity must be a number.")
//     .integer("Quantity must be an integer.")
//     .min(0, "Quantity cannot be negative.")
//     .required("Quantity is required."),