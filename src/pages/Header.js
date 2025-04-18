
import { IoCart } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { useRef } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { PiHeadphonesLight } from "react-icons/pi";
import { IoHelpCircleOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Dropdown } from "rizzui";
import CategoryComponent from "../component/CategoryComponent";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

function Header() {
  const search_input = useRef();
  const { user, signOut } = useAuth();
  function searchHandler() {}
  let cart_total = useSelector((store) => store?.cart?.total);
  let wishlist_total = useSelector((store) => store?.wishlist.total);

  function logoutHandler() {
    signOut();
  }

  useEffect(() => {}, [user]);

  return (
    <div className="relative w-full h-fit">
      {/* wlecome bar */}
      <div className="w-full bg-black text-white ">
        <div className="container flex justify-between items-center p-1">
          <p className="font-sans text-sm sm:text-lg">
            Welcome to MAYA Online Supplement Store
          </p>
          {/* <div className="flex gap-x-2 items-center text-xs">
            <p>Follow us : </p>
            <div className="flex items-center gap-x-2 cursor-pointer">
              <FaTwitter />
              <FaFacebookSquare />
              <FaLinkedin />
              <FaInstagram />
              <FaYoutube />
            </div>
          </div> */}
        </div>
      </div>
      {/* search bar */}
      <div className="w-full shadow max-sm:px-1">
        <div className="container flex justify-between items-center py-2">
          <NavLink to="/">
            <p className=" text-2xl sm:text-4xl cursor-pointer mb-1">MAYA</p>
          </NavLink>
          {/* <div className="relative w-2/5">
            <input
              ref={search_input}
              className="border-2 border-black w-full py-1 px-4 pr-8 rounded-md outline-none"
              placeholder="Search for products..."
            ></input>
            <CiSearch
              onClick={searchHandler}
              className="w-fit h-fit p-2  absolute right-1 top-0 text-xl hover:scale-125 transition duration-150 ease-in
                        cursor-pointer"
            />
          </div> */}
          <div className="px-1 flex text-2xl gap-x-6 cursor-pointer items-center">
            <div className="relative">
              <NavLink to={"/cart"} className="text-3xl">
                <IoCart  />
              </NavLink>
              <p
                className="absolute w-4 aspect-square rounded-full text-center text-sm
                                            font-bold -top-2 right-0 bg-yellow-300"
              >
                {cart_total}
              </p>
            </div>
            <div className="relative">
              <NavLink to={"/wishlist"} className="text-3xl">
                <FaHeart />
              </NavLink>
              <p
                className="absolute w-4 aspect-square rounded-full text-center text-sm text-white
                                            font-bold -top-2 right-0 bg-red-600"
              >
                {wishlist_total}
              </p>
            </div>
            <Dropdown>
              <Dropdown.Trigger>
                <IoPerson />
              </Dropdown.Trigger>
              <Dropdown.Menu className="bg-white w-fit">
                {!user && (
                  <Dropdown.Item>
                    <NavLink to={"/auth/login"}>Login</NavLink>
                  </Dropdown.Item>
                )}
                {user && (
                  <>
                    <Dropdown.Item>
                      <NavLink to={"/auth/profile"}>My Profile</NavLink>
                    </Dropdown.Item>
                    <Dropdown.Item onClick={logoutHandler}>
                      Log Out
                    </Dropdown.Item>
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
      {/* order category bar */}

      <div className="container flex  justify-between py-2 max-sm:px-1 overflow-x-auto">
        <div className="w-full flex gap-x-2 sm:gap-x-6">
          <div className="flex items-center gap-x-1 cursor-pointer">
            <CategoryComponent />
          </div>
          <div className="min-w-[110px] flex items-center gap-x-1 cursor-pointer">
            <IoLocationOutline className="size-6" />
            <p className="text-sm text-zinc-500 font-semibold">Track Order</p>
          </div>
          <div className="min-w-[150px] flex items-center gap-x-1 cursor-pointer">
            <PiHeadphonesLight className="size-6" />
            <p className="text-sm text-zinc-500 font-semibold">
              Customer Support
            </p>
          </div>
          <div className="min-w-[100px] flex items-center gap-x-1 cursor-pointer">
            <IoHelpCircleOutline className="size-6" />
            <p className="text-sm text-zinc-500 font-semibold">Need Help</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
