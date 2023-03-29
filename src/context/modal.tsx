import React, { createContext, Dispatch, useReducer } from 'react';

export type SelectedModalType =
  | 'DELETE_NOTICE'
  | 'NEW_QNA'
  | 'LOGOUT'
  | 'ADD_SEAT_TYPE'
  | 'APPLICATION_TIME'
  | 'DELETE_STUDY_ROOM'
  | 'POINT_FILTER'
  | 'DELETE_POINT_LIST'
  | 'ADD_STUDY_ROOM_TIME'
  | 'EDIT_STUDY_ROOM_TIME'
  | 'DELETE_STUDY_ROOM_TIME'
  | 'STUDENT_EXEL'
  | 'DELETE_STUDENT'
  | 'POINT_OPTIONS'
  | 'GIVE_POINT'
  | 'DELETE_POINT_OPTION'
  | 'SET_REMAIN_TIME'
  | 'CREATE_REMAIN_ITEM'
  | 'EDIT_REMAIN_ITEM'
  | 'DELETE_REMAIN_ITEM'
  | 'SCHOOL_CHECKING_CODE'
  | 'DELETE_STUDENT_TAG'
  | 'GIVE_TAG_OPTIONS'
  | 'VIEW_TAG_OPTIONS'
  | 'DELETE_TAG'
  | '';

interface ModalState {
  selectedModal: SelectedModalType;
}

type SelectModalAction = {
  type: 'SELECT';
  selected: SelectedModalType;
};

type DeleteModalAction = {
  type: 'DELETE';
};

const modalDefaultValue: ModalState = {
  selectedModal: '',
};

export const ModalStateContext = createContext<ModalState>(modalDefaultValue);

type ActionTypes = SelectModalAction | DeleteModalAction;

type SelectModalDispatch = Dispatch<ActionTypes>;

export const ModalDispatchContext = createContext<SelectModalDispatch>(
  () => null,
);

const modalReducer = (state: ModalState, action: ActionTypes): ModalState => {
  switch (action.type) {
    case 'SELECT':
      return {
        ...state,
        selectedModal: action.selected,
      };
    case 'DELETE':
      return {
        ...state,
        selectedModal: '',
      };
    default:
      return state;
  }
};

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [selectedModal, changeModalDispatch] = useReducer(
    modalReducer,
    modalDefaultValue,
  );
  return (
    <ModalStateContext.Provider value={selectedModal}>
      <ModalDispatchContext.Provider value={changeModalDispatch}>
        {children}
      </ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
}
