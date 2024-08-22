import { Route, Routes } from "react-router-dom";
import ProductForm from "./component/ProductForm";
import Home from "./component/Home";
function App(){
  return (
    <div className="max-w-[1320px] h-screen mx-auto">
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/form" element={<ProductForm/>}></Route>
      </Routes>

    </div>
  )
}

export default App;