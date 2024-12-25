import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../config/routes';
import APISERVICES from '../config/api-services';
import toast from 'react-hot-toast';

const SigninHandler = ({isLogin,setIsLogin}) => {
    let navigate=useNavigate();
    let [formdata, setFromData] = useState({
        firstname:"",
        lastname:"",
        email: "",
        password: "",
        confirmPassword:"",
    })
    async function submitHandler(event) {
        try{
            event.preventDefault();
            let response=await APISERVICES.auth.signin.post(formdata);
            if(response.success){
                navigate(routes.home.listing);
            }
            console.log(response);
        }catch(error){
            return toast.error(error.message);
        }
    };
    function changeHanlder(event) {
        setFromData((prev) => (
            {
                ...prev,
                [event.target.name]: event.target.value
            }
        ))
    }
    return (
        <form className='w-[30%] max-md:w-full h-fit flex flex-col gap-y-4 shadow-product '>
            <h1 className='text-center text-2xl font-semibold my-2 font-sans '>Sign In</h1>
            <p className=" text-center">Already Register?
                <span onClick={() => setIsLogin(!isLogin)} className='text-yellow-600 font-semibold cursor-pointer'> Log in </span>
            </p>
            <div className="relative h-9 w-10/12 mx-auto flex gap-x-2 ">
                <div className='relative w-fit'>
                    <input onChange={changeHanlder} type="text" name="firstname" id="firstname" className='input-field' required placeholder=" " />
                    <label className='input-label'>First Name</label>
                </div>
                <div className='relative w-fit'>
                    <input onChange={changeHanlder} type="text" name="lastname" id="lastname" className='input-field' required placeholder=" " />
                    <label className='input-label'>Last Name</label>
                </div>
            </div>
            <div className="relative h-9 w-10/12 mx-auto">
                <input onChange={changeHanlder} type="text" name="email" id="email" className='input-field' required placeholder=" " />
                <label className='input-label'>Email</label>
            </div>
            <div className="relative h-9 w-10/12 mx-auto">
                <input onChange={changeHanlder} type="password" name="password" id="password" className='input-field' required placeholder=" " />
                <label className='input-label'>Password</label>
            </div>
            <div className="relative h-9 w-10/12 mx-auto">
                <input onChange={changeHanlder} type="password" name="confirmPassword" id="confirmPassword" className='input-field' required placeholder=" " />
                <label className='input-label'>Confirm Password</label>
            </div>
            <div className="relative h-9 w-10/12 mx-auto mb-2">
                <button onClick={submitHandler}
                    className="w-full rounded-md bg-yellow-300 text-black font-semibold p-1 hover:bg-yellow-400 transition duration-150 ease-in">
                    Proceed</button>
            </div>
        </form>
    )
}

export default SigninHandler;