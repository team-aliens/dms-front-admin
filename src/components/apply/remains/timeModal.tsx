import { Button, Input, Modal } from '@team-aliens/design-system';
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

interface PropsType {
  timeModal: boolean;
  setTimeModal: Dispatch<SetStateAction<boolean>>;
}
const getDayWithText = (text: string) => {
  switch (text) {
    case '월':
      return DAY.MONDAY;
    case '화':
      return DAY.TUESDAY;
    case '수':
      return DAY.WEDNESDAY;
    case '목':
      return DAY.THURSDAY;
    case '금':
      return DAY.FRIDAY;
    case '토':
      return DAY.SATURDAY;
    case '일':
      return DAY.SUNDAY;
    default:
  }
};

const getTextWithDay = (day: DAY) => {
  switch (day) {
    case DAY.MONDAY:
      return '월';
    case DAY.TUESDAY:
      return '화';
    case DAY.WEDNESDAY:
      return '수';
    case DAY.THURSDAY:
      return '목';
    case DAY.FRIDAY:
      return '금';
    case DAY.SATURDAY:
      return '토';
    case DAY.SUNDAY:
      return '일';
    default:
  }
};
export default function TimeModal({ timeModal, setTimeModal }: PropsType) {
  const { data: remainTime } = useGetRemainTime();
  const [startDay, setStartDay] = useState(
    getTextWithDay(remainTime?.start_day_of_week),
  );
  const [startHour, setStartHour] = useState(
    remainTime?.start_time.slice(0, 2),
  );
  const [startMin, setStartMin] = useState(remainTime?.start_time.slice(3, 5));
  const [endDay, setEndDay] = useState(
    getTextWithDay(remainTime?.end_day_of_week),
  );
  const [endHour, setEndHour] = useState(
    remainTime?.end_day_of_week.slice(0, 2),
  );
  const [endMin, setEndMin] = useState(remainTime?.end_time.slice(3, 5));

  const { mutate } = useSetRemainTime({
    start_day_of_week: getDayWithText(startDay),
    start_time: `${startHour}:${startMin}:00`,
    end_day_of_week: getDayWithText(endDay),
    end_time: `${endHour}:${endMin}:00`,
  });
  useEffect(() => {
    setStartDay(getTextWithDay(remainTime?.start_day_of_week));
    setStartHour(remainTime?.start_time.slice(0, 2));
    setStartMin(remainTime?.start_time.slice(3, 5));
    setEndDay(getTextWithDay(remainTime?.end_day_of_week));
    setEndHour(remainTime?.end_time.slice(0, 2));
    setEndMin(remainTime?.end_time.slice(3, 5));
  }, [remainTime]);
  const onClick = () => {
    mutate();
    setTimeModal(false);
  };
  const onChange = (
    e: ChangeEvent<HTMLInputElement>,
    setter: Dispatch<SetStateAction<string>>,
  ) => {
    setter(e.target.value);
  };
  return (
    <div>
      {timeModal ? (
        <Modal
          title="잔류 신청 시간 설정"
          inputList={[
            <_TimeWrapper>
              <Input
                onChange={(e) => onChange(e, setStartDay)}
                name="startDay"
                value={startDay ?? ''}
                type="text"
                width={36}
              />
              <p className="day">요일</p>
              <Input
                onChange={(e) => onChange(e, setStartHour)}
                name="startHour"
                value={startHour ?? 0}
                type="number"
                width={60}
              />
              <p>:</p>
              <Input
                onChange={(e) => onChange(e, setStartMin)}
                name="startMin"
                value={startMin ?? 0}
                type="number"
                width={60}
              />
              <p className="to">~</p>
              <Input
                onChange={(e) => onChange(e, setEndDay)}
                name="endDay"
                value={endDay ?? ''}
                type="text"
                width={36}
              />
              <p className="day">요일</p>
              <Input
                onChange={(e) => onChange(e, setEndHour)}
                name="endHour"
                value={endHour ?? 0}
                type="number"
                width={60}
              />
              <p>:</p>
              <Input
                onChange={(e) => onChange(e, setEndMin)}
                name="endMin"
                value={endMin ?? 0}
                type="number"
                width={60}
              />
            </_TimeWrapper>,
          ]}
          buttonList={[
            <Button color="primary" onClick={onClick}>
              확인
            </Button>,
          ]}
          close={() => setTimeModal(false)}
        />
      ) : null}
    </div>
  );
}

const _TimeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
