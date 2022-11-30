import React, {
  createContext,
  Dispatch,
  FunctionComponent,
  useReducer,
} from 'react';

export type SelectedModalType = 'DELETE_NOTICE' | 'NEW_QNA' | 'LOGOUT' | '';

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
