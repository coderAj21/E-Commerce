import { useForm, FormProvider } from "react-hook-form";
import toast from "react-hot-toast";
import { Button, Tab } from "rizzui";
import APISERVICES from "../config/api-services";
import CustomLoader from "./custom-loader";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "../types/types";
import ProductDetailsForm from "./product/product-form/product-details";
import QuantityDetailsForm from "./product/product-form/quantity-details";
import NutritionalDetailForm from "./product/product-form/nutritional-details";
import { useNavigate} from "react-router-dom";
import { routes } from "../config/routes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTaxonomy } from "../redux/slices/taxonomySlice";

function ProductForm() {
  let navigate=useNavigate();
  const dispatch=useDispatch();
  const {data:taxonomy,loading:apiLoading}=useSelector((store)=>store?.taxonomy);
  
  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      product_name: "",
      description: "",
      category_id: "",
      brand_id: "",
      flavour: [],
      weight: [],
      product_image: [],
      unit_id: "",
      nutrition: [],
    },
  });
  
  const {
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;


  const onSubmit = async (data) => {
    try {
      const response = await APISERVICES.product.post(data);
      if (!response.success) {
        throw new Error(response.message);
      }
      const imageForm = new FormData();
      data?.product_image.forEach((file, idx) => {
        imageForm.append(`file_${idx}`, file);
      });
      imageForm.append("product_id", response.data);
      const imageResponse = await APISERVICES.image.post(imageForm);
      if (!imageResponse.success) {
        throw new Error(imageResponse.message);
      }
      toast.success(imageResponse.message, { position: "top-center" });
      return navigate(routes.home.listing);
    } catch (error) {
      toast.error(error.message || "Something went wrong!", {
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    dispatch(fetchTaxonomy());
  }, [dispatch]);

  if (apiLoading) {
    return <CustomLoader />;
  }
  console.log(errors);

  return (
    <FormProvider {...methods}>
      <div className="w-full h-full my-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-3/5 max-md:w-full  flex flex-col gap-y-5 mx-auto px-4 shadow-product"
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
              <Tab.Panel>
                <NutritionalDetailForm taxonomy={taxonomy} />
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
