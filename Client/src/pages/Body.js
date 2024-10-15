import Home from "../pages/Home";
import { Routes,Route } from "react-router-dom";
import ProductPage from "./ProductPage";
import ProductForm from "../component/ProductForm";


function Body(){
    return (
        <div className="w-full h-full">
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home/>}></Route>
                    <Route path="/home" element={<Home/>}></Route>
                    <Route path="/form" element={<ProductForm/>}></Route>
                    <Route path="/product" element={<ProductPage/>} ></Route>
                </Routes>
            </div>
        </div>
    )
}
export default Body;