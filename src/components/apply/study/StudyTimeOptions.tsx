import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import {
  usePatchStudyRoom,
  useStudyRoomDetail,
  useStudyTimeSlots,
} from '@/apis/studyRooms';
import { useNavigate, useParams } from 'react-router-dom';
import { useStudyRoom } from '@/hooks/useStudyRoom';
import { Seat } from '@/apis/studyRooms/request';
import { pagePath } from '@/utils/pagePath';
import { tranformTimeSlot } from '@/utils/time';

export default function StudyTimeOptions({
  timeSlotId,
  setTimeSlotState,
  refetch,
}: {
  timeSlotId: string;
  setTimeSlotState: React.Dispatch<React.SetStateAction<string>>;
  refetch: () => void;
}) {
  const { id } = useParams();
  const { data: detail } = useStudyRoomDetail(id, timeSlotId);
  const { initalValue, studyRoomState } = useStudyRoom();
  const { time_slots, seat, ...creatStudyRoomRequest } = studyRoomState;

  const [selectId, setSelectId] = useState(timeSlotId);

  const onClick = (id: string) => {
    setSelectId(id);
    setTimeSlotState(id);
    refetch();
  };
  useEffect(() => {
    initalValue(detail);
  }, [detail]);

  return (
    <_wrapper>
      <_title>자습실 이용 시간</_title>
      <_studyTimeSlots>
        {detail?.time_slots.map((timeSlot) => (
          <_studyTimeSlot
            isSelect={selectId === timeSlot.id}
            onClick={() => onClick(timeSlot.id)}
          >
            {tranformTimeSlot(timeSlot).start_hour}:
            {tranformTimeSlot(timeSlot).start_min} ~{' '}
            {tranformTimeSlot(timeSlot).end_hour}:
            {tranformTimeSlot(timeSlot).end_min}
          </_studyTimeSlot>
        ))}
      </_studyTimeSlots>
    </_wrapper>
  );
}

const _wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 40px;
`;
const _title = styled.p`
  font-weight: 700;
  font-size: 14px;
`;
const _studyTimeSlots = styled.div`
  display: flex;
  gap: 12px;
  margin-left: 16px;
  white-space: nowrap;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    height: 8px;
  }
`;
const _studyTimeSlot = styled.button<{ isSelect: boolean }>`
  display: flex;
  flex: none;
  justify-content: center;
  align-items: center;
  width: 126px;
  height: 30px;
  background: ${({ isSelect }) => (isSelect ? '#F5F9FF' : '#ffffff')};
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  color: ${({ isSelect }) => (isSelect ? '#3D8AFF' : 'black')};
  border: ${({ isSelect }) => (isSelect ? '1px solid #3D8AFF' : 'black')};
  cursor: pointer;
`;
