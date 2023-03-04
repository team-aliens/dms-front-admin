import { Modal, Button, Input, DropDown } from '@team-aliens/design-system';
import styled from 'styled-components';
import { ApplicationTime } from './AddStudyRoomTime';

const hourToArray = Array(24)
  .fill(void 0)
  .map((_, idx) => `${idx < 10 ? '0' + String(idx) : String(idx)}`);

const minToArray = Array(60)
  .fill(void 0)
  .map((_, idx) => `${idx < 10 ? '0' + String(idx) : String(idx)}`);

interface PropsType {
  close: () => void;
  startAt: string;
  endAt: string;
  setApplicationTime: () => void;
  onChangeDropdown: (type: keyof ApplicationTime, value: string) => void;
}

export function SetApplicationTimeModal({
  close,
  startAt,
  endAt,
  setApplicationTime,
  onChangeDropdown,
}: PropsType) {
  const [startHour, startMin] = startAt.split(':');
  const [endHour, endMin] = endAt.split(':');

  return (
    <Modal
      title="자습실 신청 시간 설정"
      close={close}
      inputList={[
        <_Time>
          <DropDown
            items={hourToArray}
            placeholder="0"
            onChange={(startHour) => onChangeDropdown('startHour', startHour)}
            width={80}
          />
          <p>:</p>
          <DropDown
            items={minToArray}
            placeholder="0"
            onChange={(startMin) => onChangeDropdown('startMin', startMin)}
            width={80}
          />
          <p className="to">~</p>
          <DropDown
            items={hourToArray}
            placeholder="0"
            onChange={(endHour) => onChangeDropdown('endHour', endHour)}
            width={80}
          />
          <p>:</p>
          <DropDown
            items={minToArray}
            placeholder="0"
            onChange={(endMin) => onChangeDropdown('endMin', endMin)}
            width={80}
          />
        </_Time>,
      ]}
      buttonList={[<Button onClick={setApplicationTime}>저장</Button>]}
    />
  );
}

const _Time = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
