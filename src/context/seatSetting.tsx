import React, { createContext, Dispatch, useReducer } from 'react';
import { SeatStatusType, StudyRoom } from '@/apis/studyRooms/request';
import { SeatPreview, SeatType } from '@/apis/studyRooms/response';

export interface PreviewSeat {
  width_location: number;
  height_location: number;
  number: number | null;
  type: SeatType | null;
  status: SeatStatusType;
}

interface SeatState extends StudyRoom {
  seats: SeatPreview[];
  seat: PreviewSeat;
}

type SelectSeatAction = {
  type: 'SELECT_SEAT';
  payload: {
    x: number;
    y: number;
  };
};

type SetSeatAction = {
  type: 'SET_SEAT';
  payload: PreviewSeat;
};

type CancelSetSeatAction = {
  type: 'CANCEL_SET_SEAT';
};

type ConfirmSetSeatAction = {
  type: 'CONFIRM_SET_SEAT';
};

type SetStudyRoomOption = {
  type: 'SET_STUDY_ROOM_OPTION';
  payload: StudyRoom;
};

const seatInitialValue: PreviewSeat = {
  status: 'AVAILABLE',
  width_location: null,
  height_location: null,
  type: null,
  number: null,
};

const seatDefaultValue: SeatState = {
  floor: 0,
  name: '',
  total_width_size: 0,
  total_height_size: 0,
  east_description: '',
  west_description: '',
  south_description: '',
  north_description: '',
  available_sex: 'ALL',
  available_grade: 0,
  seats: [],
  seat: seatInitialValue,
};

export const SeatSettingContext = createContext<SeatState>(seatDefaultValue);

type ActionTypes =
  | SetSeatAction
  | SetStudyRoomOption
  | CancelSetSeatAction
  | SelectSeatAction
  | ConfirmSetSeatAction;

type StudyRoomSettingDispatch = Dispatch<ActionTypes>;

export const SeatSettingDispatchContext =
  createContext<StudyRoomSettingDispatch>(() => null);

const setSeatReducer = (state: SeatState, action: ActionTypes): SeatState => {
  switch (action.type) {
    case 'SET_SEAT':
      return {
        ...state,
        seat: action.payload,
      };
    case 'SET_STUDY_ROOM_OPTION':
      return {
        ...state,
        ...action.payload,
      };
    case 'CANCEL_SET_SEAT':
      return {
        ...state,
        seat: seatInitialValue,
      };
    case 'CONFIRM_SET_SEAT':
      return {
        ...state,
        seats: state.seats.concat(state.seat),
        seat: seatInitialValue,
      };
    case 'SELECT_SEAT':
      return {
        ...state,
        seat: {
          ...state.seat,
          width_location: action.payload.x,
          height_location: action.payload.y,
        },
      };
    default:
      return state;
  }
};

export function SeatSettingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [seat, setSeat] = useReducer(setSeatReducer, seatDefaultValue);
  return (
    <SeatSettingContext.Provider value={seat}>
      <SeatSettingDispatchContext.Provider value={setSeat}>
        {children}
      </SeatSettingDispatchContext.Provider>
    </SeatSettingContext.Provider>
  );
}
