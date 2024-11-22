
export const routes={
    home:{
        listing:"/",
        home:"/home"
    },
    products:{
        detials:(id)=>`product/${id}`,
    },
    order:{
        listing:"/order",
    },
    cart:{
        listing:"/cart",

    },
    Wishlist:{
        listing:"/wishlist",
    },
    filter:{
        listing: (category = null, subCategory = null, brand = null,sort=null) => 
            `/filter?category_name=${category}&subCategory=${subCategory}&brand_name=${brand}&sort=${sort}`
    },
    auth:{
    }
}