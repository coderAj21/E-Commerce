import { useDispatch, useSelector } from "react-redux"
import { addProduct } from "../redux/slices/productSlice";
import { useEffect } from "react";


let url=process.env.REACT_APP_BACKEND_URL;

const useProduct=()=>{
    let dispatch=useDispatch();
    let product=useSelector((store)=>(store?.product?.data));
    async function fetchApi(){
        let data=await fetch(`${url}/api/v1/get_products`);
        let response=await data.json();
        dispatch(addProduct(response?.data));
    }
    useEffect(()=>{
        product.length<1 && fetchApi();
    },[]);
}

export default useProduct;