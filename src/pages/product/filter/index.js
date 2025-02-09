import Filter from "./FilterPage";
import { useSearchParams } from "react-router-dom";

const ProductFilter = () => {
  const [params,setParams] = useSearchParams();
  const query = {
    category_id: params.get("category_id") ?? "",
    subCategory: params.get("subCategory") ?? "",
    brand_id: params.get("brand_id") ?? "",
    imported: params.get("imported") ?? false,
    sort: params.get("sort") ?? "",
    minPrice: params.get("minPrice") ? parseInt(params.get("minPrice")) : 0,
    maxPrice: params.get("maxPrice") ? parseInt(params.get("maxPrice")) : 10000,
  };

  function urlHandler(obj){
    setParams({...query,...obj});
  }
  return <Filter obj={query} urlHandler={urlHandler} />;
};

export default ProductFilter;
