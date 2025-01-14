import React,{useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux";
import { setEmail } from '../redux/slices/userSlice';
import { routes } from '../config/routes';
import APISERVICES from '../config/api-services';
import toast from 'react-hot-toast';

const ForgotPasswordHandler = ({}) => {
  let [formdata, setFromData] = useState({email: ""});
  let navigate=useNavigate();
  let dispatch=useDispatch();
    async function submitHandler(event) {
        try{
            event.preventDefault();
            let response=await APISERVICES.auth.forget_password.post(formdata);
            if(response.success){
                dispatch(setEmail(formdata.email));
                navigate(routes.auth.otp);
            }
            return toast.error(response.message);
        }catch(error){
            console.log(error);
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
        <div className='w-full h-[80%] flex items-center justify-center'>
            <form className='w-[30%] max-md:w-full h-fit flex flex-col gap-y-4 shadow-product'>
                <h1 className='text-center text-2xl font-semibold my-4 font-sans '>Forgot Password?</h1>
                <p className=" text-center">Enter the Email for Verification..</p>
                <div className="relative h-9 w-10/12 mx-auto">
                    <input onChange={changeHanlder} type="text" name="email" id="email" className='input-field' required placeholder=" " />
                    <label className='input-label'>Email</label>
                </div>
                <p className="mx-8">Already have Account?
                    <NavLink to={"/auth/login"} ><span className='text-yellow-600 font-semibold cursor-pointer'> Log in </span></NavLink>
                </p>
                <div className="relative h-9 w-10/12 mx-auto mb-2">
                    <button onClick={submitHandler}
                        className="w-full rounded-md bg-yellow-300 text-black font-semibold p-1 hover:bg-yellow-400 transition duration-150 ease-in">
                        Send OTP</button>
                </div>
            </form>
        </div>
    )
}

export default ForgotPasswordHandler;