import { useDispatch, useSelector } from "react-redux";
import {closeModal, openModal} from "../../redux/slices/modelSlice";


export function useModal() {
  const dispatch = useDispatch();
  const state = useSelector((store) => store?.modal);
  const open = ({ view, customSize, size }) => {
    dispatch(openModal({ view, customSize, size }));
  };

  const close = () => {
    dispatch(closeModal());
  };

  return { ...state, openModal: open, closeModal: close };
}
