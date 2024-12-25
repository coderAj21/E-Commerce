import React,{useState} from 'react';
import {useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { routes } from '../config/routes';
import APISERVICES from '../config/api-services';

const ResetPasswordHandler = () => {
  let [formdata, setFromData] = useState({
        password: "",
        confirmPassword:"",
    })
    let navigate=useNavigate();
    
    let user=useSelector((store)=>store.user);
    if(!user.email){
        navigate(routes.auth.forget_password);
        return;
    };
    
    async function submitHandler(event) {
        try{
            event.preventDefault();
            formdata.email=user.email;
            let response=await APISERVICES.auth.reset_password.post(formdata);
            if(response.success){
                navigate(routes.auth.login);
            }
        }catch(error){
            console.log(error);
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
        <div className='w-full h-[80%] flex justify-center items-center'>
            <form className='w-[30%] max-md:w-full h-fit flex flex-col gap-y-4 shadow-product'>
                <h1 className='text-center text-2xl font-semibold mt-4 font-sans '>Reset Password</h1>
                <p className=" text-center">Please Dont use the Old Password... </p>
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
                        Reset Password</button>
                </div>
            </form>

        </div>
    )
};

export default ResetPasswordHandler;