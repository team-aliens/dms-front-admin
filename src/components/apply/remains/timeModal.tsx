import { Button, DropDown, Input, Modal } from '@team-aliens/design-system';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import { useGetRemainTime, useSetRemainTime } from '@/hooks/useRemainApi';
import { DAY } from '@/apis/remains';
import { getDayWithText, getTextWithDay } from '@/utils/remain';
import { useModal } from '@/hooks/useModal';
import { useForm } from '@/hooks/useForm';
interface ITimeState {
  startDay: string;
  startHour: string;
  startMin: string;
  endDay: string;
  endHour: string;
  endMin: string;
}
export default function TimeModal() {
  const { data: remainTime } = useGetRemainTime();
  const {
    onHandleChange,
    state: timeState,
    setState: setTimeState,
  } = useForm<ITimeState>({
    startDay: getTextWithDay(remainTime?.start_day_of_week),
    startHour: remainTime?.start_time.slice(0, 2),
    startMin: remainTime?.start_time.slice(3, 5),
    endDay: getTextWithDay(remainTime?.end_day_of_week),
    endHour: remainTime?.end_time.slice(0, 2),
    endMin: remainTime?.end_time.slice(3, 5),
  });
  const { closeModal } = useModal();
  const { mutate } = useSetRemainTime({
    start_day_of_week: getDayWithText(timeState.startDay),
    start_time: `${timeState.startHour}:${timeState.startMin}:00`,
    end_day_of_week: getDayWithText(timeState.endDay),
    end_time: `${timeState.endHour}:${timeState.endMin}:00`,
  });
  const onClick = () => {
    mutate();
    closeModal();
  };
  return (
    <Modal
      title="잔류 신청 시간 설정"
      inputList={[
        <_TimeWrapper>
          <Input
            onChange={onHandleChange}
            name={'startDay'}
            value={timeState.startDay}
          />
          <p className="day">요일</p>
          <Input
            onChange={onHandleChange}
            name={'startHour'}
            value={timeState.startHour}
          />
          <p className="day">:</p>
          <Input
            onChange={onHandleChange}
            name={'endDay'}
            value={timeState.startMin}
          />
          <p className="to">~</p>
          <Input
            onChange={onHandleChange}
            name={'endHour'}
            value={timeState.endDay}
          />
          <p className="day">요일</p>
          <Input
            onChange={onHandleChange}
            name={'endHour'}
            value={timeState.endHour}
          />
          <p className="day">:</p>
          <Input
            onChange={onHandleChange}
            name={'endMin'}
            value={timeState.endMin}
          />
        </_TimeWrapper>,
      ]}
      buttonList={[
        <Button color="primary" onClick={onClick}>
          확인
        </Button>,
      ]}
      close={closeModal}
    />
  );
}

const _TimeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  > .day {
    margin: 0 8px;
  }
  > .to {
    margin: 0 32px;
  }
  > div > label > input {
    text-align: center;
  }
`;
