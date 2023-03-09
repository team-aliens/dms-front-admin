import {
  AllPointsOptionType,
  StudentPointHistoryType,
} from '@/apis/points/response';
import React, { createContext, Dispatch, useReducer } from 'react';

export interface StudentSummary {
  studentId: string;
  name: string;
  gcn: string;
}

export interface PointHistoryList extends StudentSummary {
  list: StudentPointHistoryType[];
}

interface PointHistoryListState {
  recentlySelectedStudent: StudentSummary;
  pointHistoryList: PointHistoryList[];
}

type SelectStudentAction = {
  type: 'SELECT_STUDENT';
  info: StudentSummary;
};

type AddPointListAction = {
  type: 'ADD_STUDENT';
  pointHistory: StudentPointHistoryType[];
};

type AddPointAction = {
  type: 'ADD_POINT_TO_SELECTED_STUDENTS';
  point: AllPointsOptionType;
};

type RemovePointListAction = {
  type: 'REMOVE';
  studentId: string;
};

type ResetStudentListAction = {
  type: 'RESET';
};

const listDefaultValue: PointHistoryListState = {
  pointHistoryList: [],
  recentlySelectedStudent: {
    name: '',
    gcn: '',
    studentId: '',
  },
};

export const PointHistoryListStateContext =
  createContext<PointHistoryListState>(listDefaultValue);

type ActionTypes =
  | AddPointListAction
  | RemovePointListAction
  | AddPointAction
  | SelectStudentAction
  | ResetStudentListAction;

type DispatchTypes = Dispatch<ActionTypes>;

export const PointListDispatchContext = createContext<DispatchTypes>(
  () => null,
);

const pointHistoryListReducer = (
  state: PointHistoryListState,
  action: ActionTypes,
): PointHistoryListState => {
  switch (action.type) {
    case 'SELECT_STUDENT':
      return {
        ...state,
        recentlySelectedStudent: action.info,
      };
    case 'ADD_STUDENT':
      return {
        ...state,
        pointHistoryList: state.pointHistoryList
          .filter(
            (i) => i.studentId !== state.recentlySelectedStudent.studentId,
          )
          .concat({
            list: action.pointHistory,
            ...state.recentlySelectedStudent,
          }),
      };
    case 'REMOVE':
      return {
        ...state,
        pointHistoryList: state.pointHistoryList.filter(
          (list) => list.studentId !== action.studentId,
        ),
      };
    case 'ADD_POINT_TO_SELECTED_STUDENTS':
      return {
        ...state,
        pointHistoryList: state.pointHistoryList.map((history) => {
          return {
            ...history,
            list: [
              {
                ...action.point,
                point_history_id: action.point.point_option_id,
              },
              ...history.list,
            ],
          };
        }),
      };
    case 'RESET':
      return {
        ...state,
        pointHistoryList: [],
      };
    default:
      return state;
  }
};

export function PointListProvider({ children }: { children: React.ReactNode }) {
  const [lists, dispatch] = useReducer(
    pointHistoryListReducer,
    listDefaultValue,
  );
  return (
    <PointHistoryListStateContext.Provider value={lists}>
      <PointListDispatchContext.Provider value={dispatch}>
        {children}
      </PointListDispatchContext.Provider>
    </PointHistoryListStateContext.Provider>
  );
}
