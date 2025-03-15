import { NavLink } from "react-router-dom";
import { routes } from "../config/routes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTaxonomy } from "../redux/slices/taxonomySlice";

const Footer = () => {
  const taxonomy = useSelector((store) => store?.taxonomy);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTaxonomy());
  }, [dispatch]);

  return (
    <div className="w-full h-full max-sm:px-2  mt-10 bg-black">
      <div className="container flex flex-col gap-y-2">
        <div className="w-full h-full my-2 text-white grid grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 gap-5 ">
          <div>
            <p className="font-bold my-2">MAYA</p>
            <ul className="text-zinc-300 cursor-pointer">
              <li>
                <NavLink to={routes.footer.about_us}>About Us</NavLink>
              </li>
              <li>
                <NavLink to={routes.footer.contact_us}>Contact Us</NavLink>
              </li>
              <li>Terms and Condition</li>
            </ul>
          </div>
          <div>
            <p className="font-bold my-2">Brands</p>
            <ul className="text-zinc-300 cursor-pointer">
              {taxonomy?.data?.brand?.map((item, idx) => {
                return (
                  <li key={"brand" + idx}>
                    <NavLink
                      to={routes.filter.listing({ brand_id: item?.brand_id })}
                      target="_blank"
                    >
                      {item?.brand_name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <p className="font-bold my-2">Health & Fitness</p>
            <ul className="text-zinc-300 cursor-pointer">
              <li>Proteins</li>
              <li>Vitamins</li>
              <li>Gainer</li>
              <li>Ayurveda</li>
            </ul>
          </div>
          <div className="w-[200px]">
            <p className="font-bold my-2">Quick Links</p>
            <ul className="text-zinc-300 cursor-pointer">
              <li>My Account</li>
              <li>Track Your Order</li>
              <li>Store Locator</li>
              <li>FAQs</li>
            </ul>
          </div>
          <div className="w-[200px]">
            <p className="font-bold my-2">Contact Us</p>
            <ul className="w-full text-zinc-300 cursor-pointer">
              <li>care@maya.com</li>
              <li>+91 9717443134</li>
              <li>Sec 91 Faridabad Haryana</li>
            </ul>
          </div>
        </div>
        <div className="w-full h-full my-4">
          <ul className="flex flex-wrap items-start gap-x-4">
            <li>
              <img src="/assets/upi.svg" alt="payment-type"></img>
            </li>
            <li>
              <img src="/assets/visa.svg" alt="payment-type"></img>
            </li>
            <li>
              <img src="/assets/pay3.svg" alt="payment-type"></img>
            </li>
            <li>
              <img src="/assets/pay6.svg" alt="payment-type"></img>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
