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
import { getDayWithText, getTextWithDay } from '@/utils/translate';
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

const hourToArray = Array(24)
  .fill(void 0)
  .map((_, idx) => `${idx < 10 ? '0' + String(idx) : String(idx)}`);

const minToArray = Array(60)
  .fill(void 0)
  .map((_, idx) => `${idx < 10 ? '0' + String(idx) : String(idx)}`);

const dayToArray = ['월', '화', '수', '목', '금', '토', '일'];
export default function TimeModal() {
  const { data: remainTime } = useGetRemainTime();
  const { state: timeState, setState: setTimeState } = useForm<ITimeState>({
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
  useEffect(() => {
    setTimeState({
      startDay: getTextWithDay(remainTime?.start_day_of_week),
      startHour: remainTime?.start_time.slice(0, 2),
      startMin: remainTime?.start_time.slice(3, 5),
      endDay: getTextWithDay(remainTime?.end_day_of_week),
      endHour: remainTime?.end_time.slice(0, 2),
      endMin: remainTime?.end_time.slice(3, 5),
    });
  }, [remainTime]);
  const onClick = () => {
    mutate();
    closeModal();
  };

  const onChangeDropDown = (value: string, key: string) => {
    setTimeState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onHandleChange = () => {};
  return (
    <Modal
      title="잔류 신청 시간 설정"
      inputList={[
        <_TimeWrapper key={'time'}>
          <DropDown
            items={dayToArray}
            placeholder={'요일'}
            onChange={(value) => onChangeDropDown(value, 'startDay')}
            value={timeState.startDay}
            width={50}
          />
          <p className="day">요일</p>
          <DropDown
            items={hourToArray}
            placeholder={'시간'}
            onChange={(value) => onChangeDropDown(value, 'startHour')}
            value={timeState.startHour}
            width={50}
          />
          <p className="day">:</p>
          <DropDown
            items={minToArray}
            placeholder={'분'}
            onChange={(value) => onChangeDropDown(value, 'startMin')}
            value={timeState.startMin}
            width={50}
          />
          <p className="to">~</p>
          <DropDown
            items={dayToArray}
            placeholder={'요일'}
            onChange={(value) => onChangeDropDown(value, 'endDay')}
            value={timeState.endDay}
            width={50}
          />
          <p className="day">요일</p>
          <DropDown
            items={hourToArray}
            placeholder={'시간'}
            onChange={(value) => onChangeDropDown(value, 'endHour')}
            value={timeState.endHour}
            width={50}
          />
          <p className="day">:</p>
          <DropDown
            items={minToArray}
            placeholder={'분'}
            onChange={(value) => onChangeDropDown(value, 'endMin')}
            value={timeState.endMin}
            width={50}
          />
        </_TimeWrapper>,
      ]}
      buttonList={[
        <Button key={'okay'} color="primary" onClick={onClick}>
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
  justify-content: space-between;
  text-align: center;
  .day {
    color: #555555;
    font-weight: 400;
    font-size: 14px;
    width: 100px;
  }
  > .to {
    margin: 0 20px;
  }
  > div > label > input {
    text-align: center;
  }
`;
