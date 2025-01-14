
import Carousel from "./Carousel";
import ProductSlider from "../component/productSlider";
import{useSelector} from "react-redux"


let images=[
    'https://www.panhomestores.com/cdn-cgi/image/width=1536,quality=90,%20format=auto,%20dpr=1.25/media/scandiweb/slider/b/e/bedding_en.jpg',
    'https://www.panhomestores.com/cdn-cgi/image/width=1536,quality=90,%20format=auto,%20dpr=1.25/media/scandiweb/slider/s/u/super_price_web_banner-en.jpg',
    'https://www.panhomestores.com/cdn-cgi/image/width=1536,quality=90,%20format=auto,%20dpr=1.25/media/scandiweb/slider/u/a/uae_en_desk.jpg',
    'https://www.panhomestores.com/cdn-cgi/image/width=1536,quality=90,%20format=auto,%20dpr=1.25/media/scandiweb/slider/w/e/web_banner-en_7.jpg',
    'https://www.panhomestores.com/cdn-cgi/image/width=1536,quality=90,%20format=auto,%20dpr=1.25/media/scandiweb/slider/u/a/uae_desk_en.jpg'
]
function Home (){
    let product_arr=useSelector((store)=>(store?.product?.data));
    if(product_arr.length<1)return;
    return (
        <div className="relative w-full">
            <Carousel images={images}/>
            <ProductSlider data={product_arr} heading={"Top Brands"}  />
            <ProductSlider data={product_arr} heading={"Imported Brands"}  />
            <ProductSlider data={product_arr} heading={"Best Selling Protiens"}  />
            <Carousel images={images}/>
        </div>
    )
}


export default Home;