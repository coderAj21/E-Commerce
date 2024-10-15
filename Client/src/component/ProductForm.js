import { useEffect, useRef, useState } from 'react';
import './ProductForm.css'
import callingToaster from '../hooks/useToaster';
import { toast } from 'react-toastify';

function ProductForm(){
    const image_ref=useRef();
    const[category,setCategory]=useState([]);
    let [img_arr,setImageArray]=useState([]);
    const [formData,setFromData]=useState({
        product_name:"",description:"",category_name:"",original_price:"",final_price:"",discount:"",
        quantity:"",brand:"",flavour:"",weight:"",
    })
    let form=useRef(null);
    function changeHanlder(event){
        setFromData((prev)=>(
            {
                ...prev,
                [event.target.name]:event.target.value
            }
        ))
    }
    
    function addImageHandler(event){
        event.preventDefault();
        let image_tag=image_ref.current;
        if(!image_tag.value){
            return toast.error("Please Select the Images!!!!!",{position:'top-center',autoClose:3000});
        }
        setImageArray([...img_arr,image_tag.files[0]]);
        console.log(image_tag.files[0]);
        image_tag.value="";
    }

    function removeImageHandler(index){
        setImageArray(
            img_arr.filter(
                (item,idx)=>(idx!==index)
            )
        );
    }
    async function submitHandler(event){
        try{
            console.log(formData);
            event.preventDefault();
            let data=await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/create_product`,{
                method:"POST",
                body:JSON.stringify(formData),
                headers:{'Content-Type':'application/json'}
            });
            let response=await data.json();
            console.log(response);
            if(!response.success){
                return toast.error(response.message,{position:'top-center',autoClose:3000});
                
            }
            let image_from=new FormData();
            if(img_arr.length<1){
                return toast.error("Please Add the Images...",{position:'top-center',autoClose:3000});
            }
            img_arr.map((val,idx)=>(
                image_from.append(`file_${idx}`,val)
            ))
            image_from.append("product_id",response.data);
            let image=await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/add_product_images`,{
                method:"POST",
                body:image_from,
            });
            let new_response=await image.json();
            if(new_response.success){
                callingToaster(new_response);
            }
            form.current.reset();
            setImageArray([]);
            setFromData({
                product_name:"",description:"",category_name:"",original_price:"",final_price:"",discount:"",
                quantity:"",brand:"",flavour:"",weight:"",
            })
        }catch(error){
            callingToaster(null,error);
        }
    }
    async function fetchApi() {
        let data=await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/get_category`);
        let response=await data.json();
        setCategory(response.data);
    }
    useEffect(()=>{
        fetchApi();
    },[]);
    // console.log(formData);
    return(
        <div className="w-full h-full my-4">
            <form ref={form} className='w-3/5 max-md:w-full h-full flex flex-col gap-y-5 mx-auto shadow-product '>
                <h1 className='text-center text-2xl font-semibold my-2 font-sans '>Product Form</h1>
                <div className='flex'>
                    <div className="relative h-10 w-1/2 mx-2">
                        <input onChange={changeHanlder} type="text" name="product_name" id="product_name"  className='input-field' required  placeholder=" " />
                        <label className='input-label'> Product Name </label>
                    </div>
                    <div className="relative h-10 w-1/2 mx-2">
                        <select name='category_name'  className='input-field-select'
                        onChange={changeHanlder}>
                            <option>Choose the Category</option>
                            {
                                category?.map((ele,index)=>{
                                    return <option key={"cat-"+index} className='input-field-option' value={ele.category_name}
                                           >{ele.category_name}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="relative h-10 w-12/12 mx-2">
                        <input onChange={changeHanlder} type="text" name="description" id="description"  className='input-field' required  placeholder=" " />
                        <label className='input-label'> Description </label>
                </div>
                <div className='flex'>
                    {/* original price */}
                    <div className="relative h-10 w-1/2 mx-2">
                        <input onChange={changeHanlder} type="number" name="original_price" id="original_price"  className='input-field' required  placeholder=" " />
                        <label className='input-label'>Original Price </label>
                    </div>
                    {/* final-price */}
                    <div className="relative h-10 w-1/2 mx-2">
                        <input onChange={changeHanlder} type="number" name="final_price" id="final_price"  className='input-field' required  placeholder=" " />
                        <label className='input-label'>Final Price </label>
                    </div>
                    {/* Discount */}
                    <div className="relative h-10 w-1/2 mx-2">
                        <input onChange={changeHanlder} type="number" name="discount" id="discount"  className='input-field' required  placeholder=" " />
                        <label className='input-label'>Discount % </label>
                    </div>
                    {/* Quantity */}
                    <div className="relative h-10 w-1/2 mx-2">
                        <input onChange={changeHanlder} type="number" name="quantity" id="quantity"  className='input-field'required placeholder=" " />
                        <label className='input-label'>Quantity </label>
                    </div>
                </div>
                {/* brand flavour weight */}
                <div className='flex'>
                    <div className="relative h-10 w-1/2 mx-2">
                        <input onChange={changeHanlder} type="text" name="brand" id="brand"   className='input-field'required placeholder=" " />
                        <label className='input-label'>Brand Name </label>
                    </div>
                    <div className="relative h-10 w-1/2 mx-2">
                        <input onChange={changeHanlder} type="text" name="flavour" id="flavour"  className='input-field'required placeholder=" " />
                        <label className='input-label'>Flavour </label>
                    </div>
                    <div className="relative h-10 w-1/2 mx-2">
                        <input onChange={changeHanlder} type="number" step="0.01" name="weight" id="weight"  className='input-field'required placeholder=" " />
                        <label className='input-label'>Weight in Kgs </label>
                    </div>
                </div>
                {/* Add Images Div */}
                <div className='relative h-10 w-3/5 mx-2 flex '>
                    <input ref={image_ref} className='w-4/5' type="file" accept='.png,.jpg,.jpeg,.webp'
                     name="product_image" id="product_image" required placeholder=" " />
                    <button onClick={addImageHandler}  className="h-fit w-1/2 px-4 py-1 bg-zinc-800 text-white rounded mx-2 hover:bg-zinc-700 transition duration-150"
                    >Add Images</button>
                </div>
                <div className='w-full flex flex-wrap'>
                    {
                        img_arr.map((src,index)=>{
                            let img_src=URL.createObjectURL(src);
                            return <img onClick={()=>removeImageHandler(index)}
                            className='w-[150px] m-2 aspect-square rounded hover:scale-95 hover:border-4 border-red-500
                            transition duration-200' key={index} src={img_src} alt='product'></img>
                        })
                    }
                </div>
                <button onClick={submitHandler}
                className='w-fit h-fit m-2 bg-green-700 px-4  py-1 text-white rounded hover:bg-green-600 transition duration-150'>Submit</button>
            </form>
        </div>
    )
}

export default ProductForm;