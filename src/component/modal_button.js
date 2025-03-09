

import { PiPlusBold } from "react-icons/pi";
import { useModal } from "../utilities/model/use-model";


export default function ModalButton({
  label = "Add New",
  className,
  customSize = "500px",
  view,
  icon = <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />,
  ...rest
}) {
  const { openModal } = useModal();
  return (
    <div
      className={className}
      onClick={() =>
        openModal({
          view,
          customSize,
        })
      }
      {...rest}
    >
      {label}
    </div>
  );
}
