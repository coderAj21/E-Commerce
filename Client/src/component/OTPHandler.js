import React,{useState} from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const OTPHandler = () => {
    let [formdata, setFromData] = useState({
        otp: ""
    })
    let navigate=useNavigate();
    
    let user=useSelector((store)=>store.user);
    if(!user.email){
        navigate("/user/forget_password");
        return;
    };
    
    async function submitHandler(event) {
        try{
            event.preventDefault();
            let data=await fetch(`http://localhost:5051/api/v1/verify_otp`,{
                method:"POST",
                credentials:"include",
                body:JSON.stringify({
                    email:user.email,
                    otp:formdata.otp
                }),
                headers:{'Content-Type':'application/json'}
            })
            let response=await data.json();
            if(response.success){
                navigate("/user/reset_password");
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
    <div className='w-full h-[80%] flex items-center justify-center'>
            <form className='w-[30%] max-md:w-full h-fit flex flex-col gap-y-4 shadow-product'>
                <h1 className='text-center text-2xl font-semibold mt-4 font-sans '>Verify OTP</h1>
                <p className=" text-center">Confirm the OTP...</p>
                <div className="relative h-9 w-10/12 mx-auto">
                    <input onChange={changeHanlder} type="number" name="otp" id="otp" className='input-field' required placeholder=" " />
                    <label className='input-label'>Enter the OTP</label>
                </div>
                <div className="relative h-9 w-10/12 mx-auto mb-2">
                    <button onClick={submitHandler}
                        className="w-full rounded-md bg-yellow-300 text-black font-semibold p-1 hover:bg-yellow-400 transition duration-150 ease-in">
                        Confirm OTP</button>
                </div>
            </form>
    </div>
  )
}

export default OTPHandler;