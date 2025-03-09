import { useQuery } from "@tanstack/react-query";
import Filter from "./FilterPage";
import { useSearchParams } from "react-router-dom";
import APISERVICES from "../../../config/api-services";
import toast from "react-hot-toast";
import debounce from "../../../utilities/debounce";
import { useCallback } from "react";

const ProductFilter = () => {
  const [params, setParams] = useSearchParams();
  const query = {
    category_id: params.get("category_id") ?? "",
    subCategory: params.get("subCategory") ?? "",
    brand_id: params.get("brand_id") ?? "",
    imported: params.get("imported") ?? false,
    sort: params.get("sort") ?? "",
    minPrice: params.get("minPrice") ? parseInt(params.get("minPrice")) : 0,
    maxPrice: params.get("maxPrice") ? parseInt(params.get("maxPrice")) : 10000,
  };
  function urlHandler(obj) {
    setParams({ ...query, ...obj });
  }
  const debouncedApiCall = useCallback(debounce(apiCalling), []);

  const { data = [], isLoading: apiLoading } = useQuery({
    queryKey: [
      query?.category_id,
      query?.brand_id,
      query?.minPrice,
      query?.maxPrice,
    ],
    queryFn: async () => {
      try {
        let res = await debouncedApiCall(query);
        if (res?.success) {
          return res?.data || [];
        }
        return [];
      } catch (error) {
        if (error?.success) {
          toast.error(error?.message);
        }
        return [];
      }
    },
  });
  return <Filter obj={query} urlHandler={urlHandler} data={data} />;
};

export default ProductFilter;

async function apiCalling(query) {
  let res = await APISERVICES.product.get(
    `/filter?category_id=${query?.category_id}&brand_id=${query?.brand_id}&minPrice=${query?.minPrice}&maxPrice=${query?.maxPrice}`
  );
  return res;
}
