import { useDispatch, useSelector } from "react-redux"
import { addProduct } from "../redux/slices/productSlice";
import { useEffect } from "react";
import APISERVICES from "../config/api-services";


let url=process.env.REACT_APP_BACKEND_URL;

const useProduct=()=>{
    let dispatch=useDispatch();
    let product=useSelector((store)=>(store?.product?.data));
    async function fetchApi(){
        let response=await APISERVICES.product.get();
        dispatch(addProduct(response?.data));
    }
    useEffect(()=>{
        product.length<1 && fetchApi();
    },[]);
}

export default useProduct;