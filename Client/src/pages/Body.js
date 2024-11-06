import Home from "../pages/Home";
import { Routes,Route } from "react-router-dom";
import ProductPage from "./ProductPage";
import ProductForm from "../component/ProductForm";
import useProduct from "../hooks/useProduct";
import Cart from "./Cart";
import Login from "./Login";
import AuthPage from "./AuthPage";
import ForgotPasswordHandler from "../component/ForgotPasswordHandler";
import OTPHandler from "../component/OTPHandler";
import ResetPasswordHandler from "../component/ResetPasswordHandler";
import Wishlist from "./Wishlist";
import { useEffect } from "react";
import { getDataFromLocalStorage } from "../hooks/useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { setCartItem } from "../redux/slices/cartSlice";
import { setWishlist } from "../redux/slices/wishlistSlice";


function Body(){
    useProduct();
    let cart=useSelector((store)=>store?.cart.data);
    let wishlist=useSelector((store)=>store?.wishlist?.data);
    let dispatch=useDispatch();
    useEffect(()=>{
        if(cart.length<1){
            let cartData=getDataFromLocalStorage("cart");
            dispatch(setCartItem(cartData?cartData:[]));
        }
        if (wishlist.length<1){
            let wishlistData=getDataFromLocalStorage("wishlist");
            dispatch(setWishlist(wishlistData?wishlistData:[]));
        }
    },[])
    return (
        <div className="w-full h-full">
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home/>}></Route>
                    <Route path="/home" element={<Home/>}></Route>
                    <Route path="/form" element={<ProductForm/>}></Route>
                    <Route path="/product/:idx" element={<ProductPage/>} ></Route>
                    <Route path="/cart" element={<Cart/>} ></Route>
                    <Route path="/wishlist" element={<Wishlist/>}></Route>
                    <Route path="/user/*" element={<AuthPage/>}>
                        <Route path="login" element={<Login/>}></Route>
                        <Route path="forget_password" element={<ForgotPasswordHandler/>} ></Route>
                        <Route path="otp" element={<OTPHandler/>} ></Route>
                        <Route path="reset_password" element={<ResetPasswordHandler/>}></Route>
                    </Route>
                </Routes>
            </div>
        </div>
    )
}
export default Body;