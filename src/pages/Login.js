import React, { useEffect, useState } from 'react';
import LoginHandler from "../component/LoginHandler";
import SigninHanlder from '../component/SigninHandler';

const Login = () => {
    let [isLogin,setIsLogin]=useState(true);
    useEffect(()=>{

    },[])
  return (
    <div className='w-full h-[80%] flex items-center justify-center'>
        {
            isLogin?
            (<LoginHandler isLogin={isLogin} setIsLogin={setIsLogin}/>)
            :
            (<SigninHanlder isLogin={isLogin} setIsLogin={setIsLogin}/>)
        }
    </div>
  )
}

export default Login;