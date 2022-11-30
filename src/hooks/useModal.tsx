import { useContext } from 'react';
import {
  ModalDispatchContext,
  ModalStateContext,
  SelectedModalType,
} from '@/context/modal';

export const useModal = () => {
  const modalState = useContext(ModalStateContext);
  const modalDispatch = useContext(ModalDispatchContext);
  const selectModal = (selected: SelectedModalType) => {
    modalDispatch({
      type: 'SELECT',
      selected,
    });
  };
  const closeModal = () => {
    modalDispatch({
      type: 'DELETE',
    });
  };
  return {
    modalState,
    selectModal,
    closeModal,
  };
};
