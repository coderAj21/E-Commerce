import React, { useState } from "react";
import { Button } from "rizzui";
import { AddressForm } from "../../component/AddressForm";
import ModalButton from "../../component/modal_button";
import { useAuth } from "../../hooks/useAuth";
import CustomLoader from "../../component/custom-loader";
import AddressCard from "../../component/user/address/address-card";
import APISERVICES from "../../config/api-services";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const AddressInformation = () => {
  const { user, isUserLogin } = useAuth();

  const { data: address_arr = [], isLoading } = useQuery({
    queryKey: ["address-listing-profile"],
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
  return (
    <div className="min-w-[600px] h-[700px] w-3/5  overflow-y-auto ">
      <div className=" w-full flex items-center justify-between  ">
        <p className="text-xl font-sans font-semibold my-3">Manage Addresses</p>
        <div className="w-fit flex justify-end">
          <ModalButton
            label={
              <Button
                variant="text"
                className="underline text-lg hover:bg-gray-100 text-blue-600 hover:text-blue-700"
              >
                Add a new address
              </Button>
            }
            view={<AddressForm />}
          />
        </div>
      </div>
      <div className="w-full my-4">
        {address_arr.map((item, idx) => {
          return (
            <div className="w-full shadow rounded p-3 border my-3">
              <AddressCard key={idx} item={item} idx={idx} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddressInformation;
