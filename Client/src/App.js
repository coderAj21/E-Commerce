import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Body from "./pages/Body";
import { useEffect } from "react";



function App(){
  return (
    <div className="w-full overflow-x-hidden">
      <Header/>
      <Body/>
      <Footer/>
    </div>
  )
}

export default App;