import { Modal, Button, Text, ActionIcon } from "rizzui";
import { RxCross2 } from "react-icons/rx";
import useModal from "../hooks/useModal";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function ModalButton({
  view,
  text,
  heading,
  customSize = "400px",
}) {
  const { openModal, closeModal } = useModal();
  const { isOpen } = useSelector((state) => state.modal);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setShouldRender(!shouldRender);
  }, [isOpen]);
  return (
    <>
      <Button
        onClick={() => {
          openModal();
        }}
      >
        {text}
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => closeModal()}
        customSize={customSize}
      >
        <div className={`m-auto px-7 pt-6 pb-8`}>
          <div className="mb-7 flex items-center justify-between">
            <Text as="h3">{heading}</Text>
            <ActionIcon size="sm" variant="text" onClick={() =>{
                console.log("clicked");
                closeModal()
            }}>
              <RxCross2 className="h-auto w-6" />
            </ActionIcon>
          </div>
          <div className="grid grid-cols-2 gap-y-6 gap-x-5 [&_label>span]:font-medium">
            {view}
          </div>
        </div>
      </Modal>
    </>
  );
}
