import styled from 'styled-components';
import { useEffect, useState } from 'react';
import {
  usePatchStudyRoom,
  useStudyRoomDetail,
  useStudyTimeSlots,
} from '@/apis/studyRooms';
import { useNavigate, useParams } from 'react-router-dom';
import { useStudyRoom } from '@/hooks/useStudyRoom';
import { Seat } from '@/apis/studyRooms/request';
import { pagePath } from '@/utils/pagePath';

export default function StudyTimeOptions({
  timeSlotId,
}: {
  timeSlotId: string;
}) {
  const { id } = useParams();
  const { data: studyTimeSlots, mutate } = useStudyTimeSlots();
  const { data: detail } = useStudyRoomDetail(id, timeSlotId);
  const { initalValue, studyRoomState } = useStudyRoom();
  const { time_slots, seat, ...creatStudyRoomRequest } = studyRoomState;
  const { mutate: patchStudyRoom } = usePatchStudyRoom(id, {
    ...studyRoomState,
    time_slot_ids: [timeSlotId],
    seats: creatStudyRoomRequest.seats.map(
      (i): Seat => ({
        width_location: i.width_location,
        height_location: i.height_location,
        number: i.number || null,
        status: i.status === 'IN_USE' ? 'AVAILABLE' : i.status,
        type_id: i.type?.id || null,
      }),
    ),
  });
  const [selectId, setSelectId] = useState('');

  const onClick = (id: string) => {
    setSelectId(id);
    patchStudyRoom();
  };
  useEffect(() => {
    mutate();
  }, []);
  useEffect(() => {
    initalValue(detail);
  }, [detail]);
  return (
    <_wrapper>
      <_title>자습실 이용시간</_title>
      <_studyTimeSlots>
        {studyTimeSlots?.time_slots.map((timeSlot) => (
          <_studyTimeSlot
            isSelect={selectId === timeSlot.id}
            onClick={() => onClick(timeSlot.id)}
          >
            {timeSlot.start_time.slice(0, 2)}:{timeSlot.start_time.slice(3, 5)}{' '}
            ~ {timeSlot.end_time.slice(0, 2)}:{timeSlot.end_time.slice(3, 5)}
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
`;
const _studyTimeSlot = styled.button<{ isSelect: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 126px;
  height: 30px;
  background: ${({ isSelect }) => (isSelect ? '#F5F9FF' : '#ffffff')};
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  color: ${({ isSelect }) => (isSelect ? '#3D8AFF' : 'black')};
  border: ${({ isSelect }) => (isSelect ? '1px solid #3D8AFF' : '')};
  cursor: pointer;
`;
