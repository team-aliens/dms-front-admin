import { ChangeEvent, useContext } from 'react';
import {
  PreviewSeat,
  SeatSettingContext,
  SeatSettingDispatchContext,
} from '@/context/seatSetting';
import {
  gradeKoreanToEng,
  GradeToKorean,
  sexKoreanToEng,
  SexToKorean,
} from '@/utils/translate';

export const useStudyRoom = () => {
  const studyRoomState = useContext(SeatSettingContext);
  const dispatch = useContext(SeatSettingDispatchContext);

  const onChangeSeatSetting = (state: Partial<PreviewSeat>) => {
    dispatch({
      type: 'SET_SEAT',
      payload: {
        ...studyRoomState.seat,
        ...state,
      },
    });
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'SET_STUDY_ROOM_OPTION',
      payload: {
        ...studyRoomState,
        [e.target.name]: e.target.value,
      },
    });
  };
  const onChangeSex = (sex: SexToKorean) => {
    dispatch({
      type: 'SET_STUDY_ROOM_OPTION',
      payload: {
        ...studyRoomState,
        available_sex: sexKoreanToEng(sex),
      },
    });
  };
  const onChangeGrade = (grade: GradeToKorean) => {
    dispatch({
      type: 'SET_STUDY_ROOM_OPTION',
      payload: {
        ...studyRoomState,
        available_grade: gradeKoreanToEng(grade),
      },
    });
  };
  const confirmSetting = () => {
    dispatch({
      type: 'CONFIRM_SET_SEAT',
    });
  };
  return {
    studyRoomState,
    onChangeGrade,
    onChangeSex,
    onChangeInput,
    onChangeSeatSetting,
    confirmSetting,
  };
};
