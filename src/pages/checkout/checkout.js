import { Accordion, AdvancedRadio, Button, RadioGroup } from "rizzui";
import { FaTruck } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { MdOutlineStar } from "react-icons/md";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../config/routes";
import { useQuery } from "@tanstack/react-query";
import APISERVICES from "../../config/api-services";
import toast from "react-hot-toast";
import CustomLoader from "../../component/custom-loader";
import AddressCard from "../../component/user/address/address-card";
import { AddressForm } from "../../component/AddressForm";
import ModalButton from "../../component/modal_button";
import CartCard from "../../component/cart/CartCard";
import { useSelector } from "react-redux";
import CheckoutInvoice from "../../component/checkout/checkout-invoice";

const Checkout = () => {
  const { user, isUserLogin } = useAuth();
  const [step, setStep] = useState({
    first: false,
    second: true,
    third: false,
    fourth: false,
  });
  const [address, setAddress] = useState(0);
  const navigate = useNavigate();
  let cart = useSelector((store) => store?.cart?.data);
  useEffect(() => {
    if (!isUserLogin) {
      return navigate(routes.auth.login);
    }
  }, []);

  const { data: address_arr = [], isLoading } = useQuery({
    queryKey: ["address-listing"],
    queryFn: async () => {
      try {
        let res = await APISERVICES.user.get(`/address/${user?.user_id}`);
        if (res?.success) {
          return res?.data || [];
        }
        return [];
      } catch (error) {
        toast.error(error?.message);
        return [];
      }
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <CustomLoader />;
  }
  console.log(step);
  return (
    <div className="w-full min-h-screen p-4 flex flex-col lg:flex-row gap-5 ">
      <div className="min-w-[800px] w-full flex flex-col gap-5 ">
        <Accordion defaultOpen={step.first} value={step.first} duration={400}>
          <Accordion.Header className="flex gap-2 text-lg shadow-md p-2 px-4 rounded-md bg-gray-200">
            <Button size="sm" >
              1
            </Button>
            <p>Login</p>
          </Accordion.Header>
          <Accordion.Body className="bg-gray-50 my-2">
            <div className="w-11/12 mx-auto py-4 rounded-md grid grid-cols-2">
              <div className="w-full flex flex-col gap-2">
                <div className="grid grid-cols-2 my-2 w-1/4 min-w-[300px]">
                  <p>Name</p>
                  <p className="font-medium">{`${user?.firstname} ${user?.lastname}`}</p>
                  <p>Email</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
                <p
                  onClick={() => alert("Logout")}
                  className="text-blue-600 font-normal"
                >
                  Logout & Sign in to another account
                </p>
                <Button
                  onClick={() =>
                    setStep((prev) => {
                      return { ...prev, second: true, first: false };
                    })
                  }
                  variant="outline"
                  className="w-fit min-w-[300px] bg-yellow-300 text-black font-medium hover:bg-yellow-400"
                >
                  Continue Checkout
                </Button>
              </div>
              <div className="w-full flex flex-col gap-2">
                <p>Advantage of secure login</p>
                <div className="flex gap-4 items-center min-w-[300px]">
                  <FaTruck />
                  <p>Easily Track Orders, Hassle free returns</p>
                </div>
                <div className="flex gap-4 items-center min-w-[300px]">
                  <FaBell />
                  <p>Get Relevent Alerts and Recommendation.</p>
                </div>
                <div className="flex gap-4 items-center min-w-[300px]">
                  <MdOutlineStar />
                  <p>Wishlist, Reviews, Rating , and more.</p>
                </div>
              </div>
            </div>
            <p className="w-11/12 mx-auto my-2 text-gray-600">
              Please note that upon clicking "Logout" you will lose all items in
              cart and will be redirected to Flipkart home page.
            </p>
          </Accordion.Body>
        </Accordion>
        <Accordion defaultOpen={step.second} duration={400}>
          <Accordion.Header className="flex gap-2 text-lg shadow-md p-2 px-4 rounded-md bg-gray-200">
            <Button size="sm" >
              2
            </Button>
            <p>Delivery Address</p>
          </Accordion.Header>
          <Accordion.Body className="w-full">
            <div className="w-full  my-2">
              <div className="w-full flex justify-end -my-1">
                <ModalButton
                  label={
                    <Button
                      variant="text"
                      className="underline text-lg hover:bg-gray-100"
                    >
                      Add a new address
                    </Button>
                  }
                  view={<AddressForm />}
                />
              </div>

              <RadioGroup
                value={address}
                setValue={setAddress}
                className="flex flex-col gap-4 p-2 h-[400px] overflow-y-auto"
              >
                {address_arr.map((item, idx) => {
                  return (
                    <AdvancedRadio
                      key={idx}
                      value={idx}
                      inputClassName="[&:checked~span_.icon]:block"
                      className=""
                    >
                      <AddressCard item={item} idx={idx} check={address} />
                    </AdvancedRadio>
                  );
                })}
              </RadioGroup>
            </div>
          </Accordion.Body>
        </Accordion>
        <Accordion defaultOpen={step.first} value={step.first} duration={400}>
          <Accordion.Header className="flex gap-2 text-lg shadow-md p-2 px-4 rounded-md bg-gray-200">
            <Button size="sm">3</Button>
            <p>Order Summary</p>
          </Accordion.Header>
          <Accordion.Body>
            <div className="w-full h-[500px] overflow-y-auto py-4 ">
              {/* add items div */}
              {cart?.map((val, idx) => {
                return <CartCard key={"cart-cart" + idx} obj={val} />;
              })}
            </div>
          </Accordion.Body>
        </Accordion>
        <Accordion>
          <Accordion.Header className="flex gap-2 text-lg shadow-md p-2 px-4 rounded-md border">
            <p>Order confirmation email will be sent to </p>
            <p className="font-medium underline text-blue-600">{user?.email}</p>
          </Accordion.Header>
          <Accordion.Body></Accordion.Body>
        </Accordion>
      </div>
      <div className="min-w-[350px] h-full shadow-md">
        <CheckoutInvoice />
      </div>
    </div>
  );
};

export default Checkout;
