import React,{useState} from 'react';
import {NavLink, useNavigate } from 'react-router-dom';

const LoginHandler = ({isLogin,setIsLogin}) => {
    let navigate=useNavigate();
    let [formdata, setFromData] = useState({
        email: "",
        password: "",
    })
    async function submitHandler(event) {
        try{
            event.preventDefault();
            let data=await fetch(`http://localhost:5051/api/v1/login`,{
                method:"POST",
                credentials:"include",
                body:JSON.stringify(formdata),
                headers:{'Content-Type':`application/json`}
            });
            let response=await data.json();
            if(response.success){
                navigate("/");
            }
        }catch(error){

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
        <form className='w-[30%] max-md:w-full h-fit flex flex-col gap-y-4 shadow-product'>
            <h1 className='text-center text-2xl font-semibold my-2 font-sans '>Login</h1>
            <p className=" text-center">Create Account?
                <span onClick={() => setIsLogin(!isLogin)} className='text-yellow-600 font-semibold cursor-pointer'> Sign in</span>
            </p>
            <div className="relative h-9 w-10/12 mx-auto">
                <input onChange={changeHanlder} type="text" name="email" id="email" className='input-field' required placeholder=" " />
                <label className='input-label'>Email</label>
            </div>
            <div className="relative h-9 w-10/12 mx-auto">
                <input onChange={changeHanlder} type="password" name="password" id="password" className='input-field' required placeholder=" " />
                <label className='input-label'>Password</label>
            </div>
            <div className='relative w-10/12 mx-auto flex justify-end'>
                <NavLink to={"/auth/forget_password"}><p className="w-fit cursor-pointer">forget password?</p></NavLink>

            </div>

            <div className="relative h-9 w-10/12 mx-auto mb-2">
                <button onClick={submitHandler}
                    className="w-full rounded-md bg-yellow-300 text-black font-semibold p-1 hover:bg-yellow-400 transition duration-150 ease-in">
                    Proceed</button>
            </div>
        </form>
    )
}

export default LoginHandler;