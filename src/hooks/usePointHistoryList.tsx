import {
  AllPointsOptionType,
  StudentPointHistoryType,
} from '@/apis/points/response';
import {
  PointHistoryListStateContext,
  PointListDispatchContext,
} from '@/context/pointHistoryList';
import { useContext } from 'react';

export const usePointHistoryList = () => {
  const state = useContext(PointHistoryListStateContext);
  const dispatch = useContext(PointListDispatchContext);
  const updateRecentlyStudentInfo = (info: {
    studentId: string;
    name: string;
    gcn: string;
  }) => {
    dispatch({
      type: 'SELECT_STUDENT',
      info,
    });
  };
  const addStudentPointHistory = (history: StudentPointHistoryType[]) => {
    dispatch({
      type: 'ADD_STUDENT',
      pointHistory: history || [],
    });
  };
  const addPointOptionToStudents = (option: AllPointsOptionType) => {
    dispatch({
      type: 'ADD_POINT_TO_SELECTED_STUDENTS',
      point: option,
    });
  };
  const resetStudentLists = () => {
    dispatch({
      type: 'RESET',
    });
  };
  const removeStudentId = (id: string) => {
    dispatch({
      type: 'REMOVE',
      studentId: id,
    });
  };

  const pointHistoryList = state.pointHistoryList;

  return {
    state,
    updateRecentlyStudentInfo,
    addStudentPointHistory,
    addPointOptionToStudents,
    resetStudentLists,
    pointHistoryList,
    removeStudentId,
  };
};
