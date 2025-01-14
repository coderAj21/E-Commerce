import React,{useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import {NavLink, useNavigate } from 'react-router-dom';
import { Input, Password } from 'rizzui';
import { setUser } from '../redux/slices/userSlice';
import toast from 'react-hot-toast';
import { routes } from '../config/routes';
import { useAuth } from '../hooks/useAuth';
import APISERVICES from '../config/api-services';
const LoginHandler = ({isLogin,setIsLogin}) => {
    let navigate=useNavigate();
    const { setUserToken, isUserLogin } = useAuth();
    const dispatch=useDispatch();
    let [formdata, setFromData] = useState({
        email: "",
        password: "",
    })
    async function submitHandler(event) {
        try{
            event.preventDefault();
            let response=await  APISERVICES.auth.login.post(formdata);
            if(response.success){
                dispatch(setUser(response.data));
                setUserToken(response.data,response.token);
                toast.success(response.message);
                navigate(routes.home.listing);
                return;
            }
            return toast.error(response.message);
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
    useEffect(()=>{
      if(isUserLogin()){
        return navigate("/");
      }
    },[])
    return (
      <form className="w-[30%] max-md:w-full h-fit flex flex-col gap-y-4 shadow-product">
        <h1 className="text-center text-2xl font-semibold my-2 font-sans ">
          Login
        </h1>
        <p className=" text-center">
          Create Account?
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-yellow-600 font-semibold cursor-pointer"
          >
            {" "}
            Sign in
          </span>
        </p>

        <Input
          name='email'
          onChange={changeHanlder}
          className="w-10/12 mx-auto"
          type="email"
          label="Email"
          placeholder="Your email"
        />
        <Password
          name='password'
          onChange={changeHanlder}
          className="w-10/12 mx-auto"
          label="Password"
          placeholder="Enter your password"
          variant="outline"
        />
        <div className="relative w-10/12 mx-auto flex justify-end">
          <NavLink to={"/auth/forget_password"}>
            <p className="w-fit cursor-pointer">forget password?</p>
          </NavLink>
        </div>

        <div className="relative h-9 w-10/12 mx-auto mb-2">
          <button
            onClick={submitHandler}
            className="w-full rounded-md bg-yellow-300 text-black font-semibold p-1 hover:bg-yellow-400 transition duration-150 ease-in"
          >
            Proceed
          </button>
        </div>
      </form>
    );
}

export default LoginHandler;