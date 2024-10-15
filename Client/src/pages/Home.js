
import Carousel from "./Carousel";
import ProductSlider from "../component/productSlider";
import { useEffect, useState } from "react";


let images=[
    'https://www.panhomestores.com/cdn-cgi/image/width=1536,quality=90,%20format=auto,%20dpr=1.25/media/scandiweb/slider/b/e/bedding_en.jpg',
    'https://www.panhomestores.com/cdn-cgi/image/width=1536,quality=90,%20format=auto,%20dpr=1.25/media/scandiweb/slider/s/u/super_price_web_banner-en.jpg',
    'https://www.panhomestores.com/cdn-cgi/image/width=1536,quality=90,%20format=auto,%20dpr=1.25/media/scandiweb/slider/u/a/uae_en_desk.jpg',
    'https://www.panhomestores.com/cdn-cgi/image/width=1536,quality=90,%20format=auto,%20dpr=1.25/media/scandiweb/slider/w/e/web_banner-en_7.jpg',
    'https://www.panhomestores.com/cdn-cgi/image/width=1536,quality=90,%20format=auto,%20dpr=1.25/media/scandiweb/slider/u/a/uae_desk_en.jpg'
]
let url=process.env.REACT_APP_BACKEND_URL;
function Home (){
    let [arr,setArray]=useState([]);
    async function fetchApi(){
        let data=await fetch(`${url}/api/v1/get_products`);
        let response=await data.json();
        setArray(response.data.sort((a, b) => b.product_id-a.product_id).filter((val,idx)=>{return idx<6}));
    }
    useEffect(()=>{
        fetchApi();
    },[])
    console.log(arr);
    return (
        <div className="relative w-full">
            <Carousel images={images}/>
            <ProductSlider data={arr} heading={"Top Brands"}  />
            <ProductSlider data={arr} heading={"Imported Brands"}  />
            <ProductSlider data={arr} heading={"Best Selling Protiens"}  />
            <Carousel images={images}/>
        </div>
    )
}


export default Home;