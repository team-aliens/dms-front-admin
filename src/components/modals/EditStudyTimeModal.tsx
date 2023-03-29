import { Button, DropDown, Modal } from '@team-aliens/design-system';
import styled from 'styled-components';
import {
  useCreateTimeSlots,
  useEditTimeSlots,
  useStudyTimeSlots,
} from '@/apis/studyRooms';
import { useForm } from '@/hooks/useForm';
import { useToast } from '@/hooks/useToast';
import { useEffect, useState } from 'react';
import { StudyTimeSlotsResponse } from '@/apis/studyRooms/response';

interface PropsType {
  initTimeSlots: StudyTimeSlotsResponse;
  closeModal: () => void;
  timeSlotId: string;
}

interface IUseForm {
  start_hour: string;
  start_min: string;
  end_hour: string;
  end_min: string;
}
const hourToArray = Array(24)
  .fill(void 0)
  .map((_, idx) => `${idx < 10 ? '0' + String(idx) : String(idx)}`);

const minToArray = Array(60)
  .fill(void 0)
  .map((_, idx) => `${idx < 10 ? '0' + String(idx) : String(idx)}`);

export default function EditStudyTimeModal({
  initTimeSlots,
  closeModal,
  timeSlotId,
}: PropsType) {
  const [timeSlots, setTimeSlots] = useState(initTimeSlots);
  const timeSlot = timeSlots.time_slots.filter(
    (slot) => slot.id === timeSlotId,
  );
  const { state: studyTimeState, setState } = useForm<IUseForm>({
    start_hour: timeSlot[0].start_time.slice(0, 2) ?? '0',
    start_min: timeSlot[0].start_time.slice(3, 5) ?? '0',
    end_hour: timeSlot[0].end_time.slice(0, 2) ?? '0',
    end_min: timeSlot[0].end_time.slice(3, 5) ?? '0',
  });
  const { mutateAsync } = useEditTimeSlots({
    body: {
      start_time: `${studyTimeState.start_hour}:${studyTimeState.start_min}`,
      end_time: `${studyTimeState.end_hour}:${studyTimeState.end_min}`,
    },
    path: {
      time_slot_id: timeSlotId,
    },
  });
  const { toastDispatch } = useToast();

  const onClick = () => {
    mutateAsync()
      .then(() => {
        toastDispatch({
          toastType: 'SUCCESS',
          actionType: 'APPEND_TOAST',
          message: '자습실 이용 시간이 수정되었습니다.',
        });
        closeModal();
      })
      .catch((err) => {
        toastDispatch({
          toastType: 'ERROR',
          actionType: 'APPEND_TOAST',
          message: '자습실 이용시간 수정이 실패되었습니다.',
        });
      });
  };

  const onChange = (name: string, value: string) => {
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <Modal
      close={closeModal}
      title="자습실 사용 시간 설정"
      inputList={[
        <_Wrapper>
          <DropDown
            placeholder="0"
            value={studyTimeState.start_hour}
            items={hourToArray}
            onChange={(value) => onChange('start_hour', value)}
          ></DropDown>
          <p>:</p>
          <DropDown
            placeholder="0"
            value={studyTimeState.start_min}
            items={minToArray}
            onChange={(value) => onChange('start_min', value)}
          ></DropDown>
          <p className="to">~</p>
          <DropDown
            placeholder="0"
            value={studyTimeState.end_hour}
            items={hourToArray}
            onChange={(value) => onChange('end_hour', value)}
          ></DropDown>
          <p>:</p>
          <DropDown
            placeholder="0"
            value={studyTimeState.end_min}
            items={minToArray}
            onChange={(value) => onChange('end_min', value)}
          ></DropDown>
        </_Wrapper>,
      ]}
      buttonList={[<Button onClick={onClick}>수정</Button>]}
    ></Modal>
  );
}

const _Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  > p {
    margin: 0 8px;
  }
  > .to {
    margin: 0 32px;
  }
  > div > label > input {
    text-align: center;
  }
`;
