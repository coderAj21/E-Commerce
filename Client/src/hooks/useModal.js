// useModal.js
import { useSelector, useDispatch } from "react-redux";
import { closeModal, openModal } from "../redux/slices/modalSlice";

const useModal = () => {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modal);
  const open = () => {
    dispatch(openModal());
  };

  const close = () => {
    dispatch(closeModal());
  };

  return {
    ...modalState,
    openModal: open,
    closeModal: close,
  };
};

export default useModal;
