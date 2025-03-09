import React, {useState } from "react";
import LoginHandler from "./LoginHandler";
import SigninHanlder from "./SigninHandler";


const Login = () => {
  let [isLogin, setIsLogin] = useState(true);
  
  return (
    <div className="w-full h-[80%] flex items-center justify-center">
      {isLogin ? (
        <LoginHandler isLogin={isLogin} setIsLogin={setIsLogin} />
      ) : (
        <SigninHanlder isLogin={isLogin} setIsLogin={setIsLogin} />
      )}
    </div>
  );
};

export default Login;
