import React, { useState } from 'react'
import { Button, Input, Password } from 'rizzui';

const PersonalInformation = () => {
  return (
    <div className='w-full h-full flex flex-col gap-y-5'>
        <BasicDetails first_name={"Ashutosh"} last_name={"Joshi"} />
        <EmailDetails email='tosela7331@nozamas.com' />
        <PasswordDetails/>
    </div>
  )
}

export default PersonalInformation;


const BasicDetails=({first_name="",last_name=""})=>{
    const [formData,setFromData]=useState({
        first_name:first_name,
        last_name:last_name
    })
    const[isEdit,setIsEdit]=useState(false);
    return(
        <div>
            <p className='text-xl font-sans font-semibold my-2'>Basic Details</p>
            <div className='flex flex-wrap gap-x-6 items-center mt-6 my-3'>
                <Input
                    type='text'
                    label="First Name"
                    disabled={!isEdit}
                    value={formData?.first_name}
                    onChange={(e)=>setFromData({...formData,first_name:e.target.value})}
                    variant="outline"
                />            
                <Input
                    type='text'
                    label="Last Name"
                    disabled={!isEdit}
                    value={formData?.last_name}
                    onChange={(e) => setFromData({ ...formData, last_name: e.target.value })}
                    variant="outline"
                />    
                <Button className='mt-6 p-0 px-4 py-1' onClick={()=>setIsEdit(!isEdit)} >{isEdit?"Cancel" :"Edit"}</Button>        
            </div>
            {isEdit && <Button onClick={() => setIsEdit(!isEdit)} variant='outline' >Save</Button>}
        </div>
    )
}
const EmailDetails=({email=""})=>{
    const [formData,setFromData]=useState({
        email:email,
    })
    const[isEdit,setIsEdit]=useState(false);
    async function handleSubmit(){
        try{
            setIsEdit(!isEdit);
        }catch(error){

        }
    }
    return(
        <div>
            <p className='text-xl font-sans font-semibold mt-6'>Email Address</p>
            <div className='flex flex-wrap gap-x-6 items-center my-3'>
                <Input
                    className='w-1/5'
                    type='text'
                    label="Email"
                    disabled={!isEdit}
                    value={formData?.email}
                    onChange={(e)=>setFromData({...formData,email:e.target.value})}
                    variant="outline"
                />               
                <Button className='mt-6 p-0 px-4 py-1' onClick={()=>setIsEdit(!isEdit)} >{isEdit?"Cancel" :"Edit"}</Button>        
            </div>
            {isEdit && <Button onClick={handleSubmit} variant='outline' >Save</Button>}
        </div>
    )
}
const PasswordDetails=()=>{
    const [formData,setFromData]=useState({
        oldPassword:"1234",
        newPassword:"",
        confirmPassword:"",

    })
    const[isEdit,setIsEdit]=useState(false);
    return(
        <div>
            <p className='text-xl font-sans font-semibold mt-6'>Change Password</p>
            <div className='flex flex-wrap gap-x-6 my-3'>
                <Password
                    className='w-1/5'
                    label="Old Password"
                    disabled={!isEdit}
                    value={formData?.oldPassword}
                    onChange={(e) => setFromData({ ...formData, oldPassword:e.target.value})}
                    variant="outline"
                />               
                <Password
                    className='w-1/5'
                    label="New Password"
                    disabled={!isEdit}
                    value={formData?.newPassword}
                    onChange={(e) => setFromData({ ...formData, newPassword:e.target.value})}
                    variant="outline"
                />               
                <Password
                    className='w-1/5'
                    label="Confirm Password"
                    disabled={!isEdit}
                    value={formData?.confirmPassword}
                    onChange={(e) => setFromData({ ...formData, confirmPassword:e.target.value})}
                    variant="outline"
                />               
            </div>
            <div className='flex gap-x-4' >
                {isEdit && <Button onClick={() => setIsEdit(!isEdit)} variant='outline' >Save</Button>}
                <Button className='py-1' onClick={() => setIsEdit(!isEdit)} >{isEdit ? "Cancel" : "Edit"}</Button>        
            </div>
            
        </div>
    )
}