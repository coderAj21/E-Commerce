import React, { useState } from "react";
import { Input, Select, Button, RadioGroup, Radio, Modal, Textarea, Dropdown, CheckboxGroup, Checkbox } from "rizzui";
import { HiDotsVertical } from "react-icons/hi";
let states_arr = [
    { label: "-- Select State --", value: "-- Select State --" },
    { label: "Andhra Pradesh", value: "Andhra Pradesh" },
    { label: "Arunachal Pradesh", value: "Arunachal Pradesh" },
    { label: "Assam", value: "Assam" },
    { label: "Bihar", value: "Bihar" },
    { label: "Chhattisgarh", value: "Chhattisgarh" },
    { label: "Delhi", value: "Delhi" },
    { label: "Goa", value: "Goa" },
    { label: "Gujarat", value: "Gujarat" },
    { label: "Haryana", value: "Haryana" },
    { label: "Himachal Pradesh", value: "Himachal Pradesh" },
    { label: "Jharkhand", value: "Jharkhand" },
    { label: "Karnataka", value: "Karnataka" },
    { label: "Kerala", value: "Kerala" },
    { label: "Madhya Pradesh", value: "Madhya Pradesh" },
    { label: "Maharashtra", value: "Maharashtra" },
    { label: "Manipur", value: "Manipur" },
    { label: "Meghalaya", value: "Meghalaya" },
    { label: "Mizoram", value: "Mizoram" },
    { label: "Nagaland", value: "Nagaland" },
    { label: "Odisha", value: "Odisha" },
    { label: "Punjab", value: "Punjab" },
    { label: "Rajasthan", value: "Rajasthan" },
    { label: "Sikkim", value: "Sikkim" },
    { label: "Tamil Nadu", value: "Tamil Nadu" },
    { label: "Telangana", value: "Telangana" },
    { label: "Tripura", value: "Tripura" },
    { label: "Uttar Pradesh", value: "Uttar Pradesh" },
    { label: "Uttarakhand", value: "Uttarakhand" },
    { label: "West Bengal", value: "West Bengal" },
];
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
                <AddressData/>
                <AddressData/>
                <AddressData/>
            </div>
        </div>
    )
}

export default AddressInformation;


const AddressForm = ({ setModalState }) => {
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        pincode: "",
        locality: "",
        address: "",
        city: "",
        state: "",
        landmark: "",
        alternatePhone: "",
        addressType: "home",
    });
    const handleInputChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };
    console.log(formData);
    return (
      <div className="p-6 bg-white rounded shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Name *"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            variant="outline"
          />
          <Input
            type="number"
            prefix="+91"
            maxLength={10}
            label="Phone Number *"
            value={formData.mobile}
            onChange={(e) => {
                if(e.target.value.length<=10){
                    handleInputChange("mobile", e.target.value)
                }
            }}
            variant="outline"
          />
          <Input
            type="number"
            label="Pincode *"
            value={formData.pincode}
            onChange={(e) =>{
                if(e.target.value.length<=6){
                    handleInputChange("pincode", e.target.value)
                }
            }}
            variant="outline"
          />
          <Input
            label="Locality *"
            value={formData.locality}
            onChange={(e) => handleInputChange("locality", e.target.value)}
            variant="outline"
          />
        </div>
        <Textarea
          className="py-6"
          label="Address (Area and Street) *"
          value={formData.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
          variant="outline"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="City/District/Town *"
            value={formData.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            variant="outline"
          />
          <Select
            searchable={true}
            label="State *"
            value={formData.state}
            onChange={(value) => handleInputChange("state", value.value)}
            options={states_arr}
          />
          <Input
            label="Landmark (Optional)"
            value={formData.landmark}
            onChange={(e) => handleInputChange("landmark", e.target.value)}
            variant="outline"
          />
          <Input
            type="number"
            prefix="+91"
            label="Alternate Phone (Optional)"
            value={formData.alternatePhone}
            onChange={(e) =>
              handleInputChange("alternatePhone", e.target.value)
            }
            variant="outline"
          />
        </div>

        {/* Address Type */}
        <div className="mt-6">
          <p className="font-medium mb-3">Address Type</p>
          <CheckboxGroup
            values={formData.addressType ? [formData.addressType] : []}
            setValues={(values) =>
              setFormData((prev) => ({
                ...prev,
                addressType: values[0] || "", 
              }))
            }
            className="flex flex-row gap-4"
          >
            <Checkbox label="Home" value="home" />
            <Checkbox label="Work" value="work" />
          </CheckboxGroup>
        </div>
        {/* Buttons */}
        <div className="mt-6 flex justify-between">
          <Button
            variant="solid"
            onClick={() => console.log("Form Data:", formData)}
          >
            Save
          </Button>
          <Button onClick={() => setModalState(false)} variant="outline">
            Cancel
          </Button>
        </div>
      </div>
    );
};

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