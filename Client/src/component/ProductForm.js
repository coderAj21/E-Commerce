import { useForm, FormProvider } from "react-hook-form";
import { toast } from "react-toastify";
import { Button, Tab } from "rizzui";
import APISERVICES from "../config/api-services";
import { useQuery } from "@tanstack/react-query";
import CustomLoader from "./custom-loader";
import ProductDetailsForm from "./product/product-details";
import QuantityDetailsForm from "./product/quantity-details";

function ProductForm() {

  const methods = useForm({
    defaultValues: {
      product_name: "",
      description: "",
      category_name: "",
      original_price: "",
      final_price: "",
      discount: "",
      quantity: "",
      brand: "",
      flavour: "",
      weight: "",
      product_image:[],
    },
  });
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = methods;

  const {
    data: taxonomy = {},
    isLoading: apiLoading,
  } = useQuery({
    queryKey: ["form"],
    queryFn: async () => {
      const res = await APISERVICES.taxonomy.get();
      if (res?.success) {
        return res?.data || {};
      } else {
        throw new Error(res?.message || "Failed to load data");
      }
    },
    onError: (error) => {
      toast.error(error.message, { position: "top-center" });
    },
  });

  

  

  const onSubmit = async (data) => {
    // if (imgArr.length < 1) {
    //   return toast.error("Please Add the Images...", {
    //     position: "top-center",
    //   });
    // }
    // try {
    //   const response = await APISERVICES.product.post(data);
    //   if (!response.success) {
    //     throw new Error(response.message);
    //   }

    //   const imageForm = new FormData();
    //   imgArr.forEach((file, idx) => {
    //     imageForm.append(`file_${idx}`, file);
    //   });
    //   imageForm.append("product_id", response.data);

    //   const imageResponse = await fetch(
    //     `${process.env.REACT_APP_BACKEND_URL}/api/v1/add_product_images`,
    //     {
    //       method: "POST",
    //       body: imageForm,
    //     }
    //   );

    //   const newResponse = await imageResponse.json();
    //   if (!newResponse.success) {
    //     throw new Error(newResponse.message);
    //   }

    //   toast.success(newResponse.message, { position: "top-center" });
    //   reset();
    //   setImgArr([]);
    // } catch (error) {
    //   toast.error(error.message || "Something went wrong!", {
    //     position: "top-center",
    //   });
    // }
  };

  if (apiLoading) {
    return <CustomLoader />;
  }
  // console.log(watch())

  return (
    <FormProvider {...methods}>
      <div className="w-full h-full my-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-3/5 max-md:w-full h-screen flex flex-col gap-y-5 mx-auto px-4 shadow-product"
        >
          <h1 className="text-center text-2xl font-semibold my-2 font-sans">
            Product Form
          </h1>
          <Tab>
            <Tab.List>
              <Tab.ListItem>Product Details</Tab.ListItem>
              <Tab.ListItem>Quantity & Price</Tab.ListItem>
              <Tab.ListItem>Nutritional Information</Tab.ListItem>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <ProductDetailsForm taxonomy={taxonomy} />
              </Tab.Panel>
              <Tab.Panel>
                <QuantityDetailsForm taxonomy={taxonomy} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab>
          <Button type="submit" className="mt-4 bg-green-700 text-white">
            Submit
          </Button>
        </form>
      </div>
    </FormProvider>
  );
}

export default ProductForm;
