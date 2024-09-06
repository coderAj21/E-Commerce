import { Route, Routes } from "react-router-dom";
import ProductForm from "./component/ProductForm";
import Home from "./component/Home";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App(){
  return (
    <div className="max-w-[1320px] h-screen mx-auto">
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/form" element={<ProductForm/>}></Route>
      </Routes>
      <ToastContainer/>
    </div>
  )
}

export default App;