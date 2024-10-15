import { FaTwitter } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoCart } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { useRef } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { PiHeadphonesLight } from "react-icons/pi";
import { IoHelpCircleOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineAddIcCall } from "react-icons/md";
import { NavLink } from "react-router-dom";


function Header(){
    const search_input=useRef();

    function searchHandler(){
        console.log(search_input.current.value);

    }

    return (
        <div className="relative w-full h-fit border">
            {/* wlecome bar */}
            <div className="w-full bg-black text-white">
                <div className="container flex justify-between items-center py-1">
                    <p className="font-sans">Welcome to MAYA Online Supplement Store</p>
                    <div className="flex gap-x-2 items-center">
                        <p>Follow us : </p>
                        <div className="flex items-center gap-x-2 cursor-pointer">
                            <FaTwitter/>
                            <FaFacebookSquare/>
                            <FaLinkedin/>
                            <FaInstagram/>
                            <FaYoutube/>
                        </div>
                        
                    </div>
                </div>
            </div>
            {/* search bar */}
            <div className="w-full shadow">
                <div className="container flex justify-between items-center py-2">
                    <NavLink to="/" ><p className="text-4xl cursor-pointer mb-1">MAYA</p></NavLink>
                    <div className="relative w-2/5">
                        <input ref={search_input} className="border-2 border-black w-full py-1 px-4 pr-8 rounded-md outline-none" placeholder="Search for products..." ></input>
                        < CiSearch onClick={searchHandler} className="w-fit h-fit p-2  absolute right-1 top-0 text-xl hover:scale-125 transition duration-150 ease-in
                        cursor-pointer"/>
                    </div>
                    <div className=" px-4 flex text-2xl gap-x-6 cursor-pointer items-center">
                        <IoCart/>
                        <FaHeart/>
                        <IoPerson/>
                    </div>

                </div>
            </div>
            {/* order category bar */}
            <div  className="w-full">
                <div className="container flex justify-between py-2">
                        <div className="w-full flex gap-x-8">
                            <div className="flex items-center gap-x-1 cursor-pointer">
                                <p className="text-sm text-zinc-500 font-semibold">All Cateory</p>
                                <IoIosArrowDown className="text-xl"/>
                            </div>
                            <div className="flex items-center gap-x-1 cursor-pointer">
                                <IoLocationOutline className="text-xl"/>
                                <p className="text-sm text-zinc-500 font-semibold">Track Order</p>
                            </div>
                            <div className="flex items-center gap-x-1 cursor-pointer">
                                < PiHeadphonesLight className="text-xl"/>
                                <p className="text-sm text-zinc-500 font-semibold">Customer Support</p>
                            </div>
                            <div className="flex items-center gap-x-1 cursor-pointer">
                                <IoHelpCircleOutline className="text-xl"/>
                                <p className="text-sm text-zinc-500 font-semibold">Need Help</p>
                            </div>
                        </div>
                        <div className="w-full flex justify-end">
                            <div className="flex items-center gap-x-1 cursor-pointer px-2">
                                <MdOutlineAddIcCall className="text-2xl text-zinc-600"/>
                                <p className="font-semibold">+91 9717443134</p>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Header;