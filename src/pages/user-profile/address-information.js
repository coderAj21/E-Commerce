import React, { useState } from "react";
import { Button,Modal, Dropdown} from "rizzui";
import { HiDotsVertical } from "react-icons/hi";
import { AddressForm } from "../../component/AddressForm";

const AddressInformation=()=>{
    const [modalState, setModalState] = useState(false);
    return (
        <div className="w-full h-full">
            <div className="flex items-center gap-x-2 px-2 ">
                <p className='text-xl font-sans font-semibold my-3'>Manage Addresses</p>
                <Button className="w-fit p-0 px-4" variant="solid" onClick={() => setModalState(true)}>+ Add A New Address</Button>
                <Modal isOpen={modalState} onClose={() => setModalState(false)}>
                    <AddressForm setModalState={setModalState} />
                </Modal>
            </div>
            <div className="w-3/5 my-4">
            </div>
        </div>
    )
}

export default AddressInformation;




const AddressData=()=>{
    return (
      <div className="w-full p-4 my-6 shadow rounded bg-slate-50">
        <div className="w-full flex justify-between items-center">
          <span className="uppercase bg-slate-200 p-1 text-sm">Home</span>
          <Dropdown className="">
            <Dropdown.Trigger>
              <HiDotsVertical />
            </Dropdown.Trigger>
            <Dropdown.Menu className="w-fit">
              <Dropdown.Item>Edit</Dropdown.Item>
              <Dropdown.Item>Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="flex gap-x-3 my-1 font-medium">
          <p>Ashutosh Joshi</p>
          <p>9717443134</p>
        </div>
        <p>
          E-2/ gali no 10 surya vihar part -3 sehatpur faridabad, Gyasi Kothi,
          Faridabad, Haryana - <span className="font-medium">121003</span>
        </p>
      </div>
    );
}