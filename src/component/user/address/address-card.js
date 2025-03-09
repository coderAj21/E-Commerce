import { Button } from "rizzui";
import ModalButton from "../../modal_button";
import { AddressForm } from "../../AddressForm";
import { GiCheckMark } from "react-icons/gi";

const AddressCard = ({ item, idx, check }) => {
  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          {check == idx && <GiCheckMark className="size-5" stroke={10} />}
          <span className="uppercase bg-slate-200 font-medium font-sans p-1 px-2 rounded-md text-sm">
            {item?.address_type}
          </span>
          <p className="font-medium">{item?.name}</p>
          <p className="font-medium underline">{item?.phone_number}</p>
        </div>
        <ModalButton
          label={
            <Button
              variant="text"
              className="underline text-blue-600 hover:text-blue-700"
            >
              EDIT
            </Button>
          }
          view={<AddressForm data={item} id={item?.address_id} />}
        />
      </div>
      <div className="flex flex-wrap gap-x-1 text-left p-1 my-1 whitespace-normal">
        <span>{item?.address_line}, </span>
        <span>{item?.city}, </span>
        <span>{item?.country}</span>
        <span className="font-semibold">- {item?.pincode}</span>
      </div>
      {check == idx && (
        <Button
          variant="outline"
          className="my-2 bg-yellow-300 text-black font-medium hover:bg-yellow-400"
        >
          Deliver Here
        </Button>
      )}
    </div>
  );
};

export default AddressCard;
