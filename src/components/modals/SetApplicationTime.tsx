import { Modal, Button, Input } from '@team-aliens/design-system';
import styled from 'styled-components';
import { useForm } from '@/hooks/useForm';
import {
  useGetApplicationTime,
  useSetApplicationTime,
} from '@/apis/studyRooms';

interface ApplicationTime {
  startHour: string;
  startMin: string;
  endHour: string;
  endMin: string;
}

interface PropsType {
  close: () => void;
  startAt: string;
  endAt: string;
}

export function SetApplicationTimeModal({ close, startAt, endAt }: PropsType) {
  const { refetch } = useGetApplicationTime();
  const { state, onHandleChange } = useForm<ApplicationTime>({
    startHour: startAt.slice(0, 2),
    startMin: startAt.slice(3, 5),
    endHour: endAt.slice(0, 2),
    endMin: endAt.slice(3, 5),
  });
  const setApplicationTime = useSetApplicationTime(
    {
      start_at: `${state.startHour}:${state.startMin}:00`,
      end_at: `${state.endHour}:${state.endMin}:00`,
    },
    {
      onSuccess: () => {
        refetch();
        close();
      },
    },
  );

  return (
    <Modal
      title="자습실 신청 시간 설정"
      close={close}
      inputList={[
        <_Time>
          <Input
            width={80}
            onChange={onHandleChange}
            name="startHour"
            value={state.startHour}
            type="number"
          />
          <p>:</p>
          <Input
            width={80}
            onChange={onHandleChange}
            name="startMin"
            value={state.startMin}
            type="number"
          />
          <p className="to">~</p>
          <Input
            width={80}
            onChange={onHandleChange}
            name="endHour"
            value={state.endHour}
            type="number"
          />
          <p>:</p>
          <Input
            width={80}
            onChange={onHandleChange}
            name="endMin"
            value={state.endMin}
            type="number"
          />
        </_Time>,
      ]}
      buttonList={[<Button onClick={setApplicationTime.mutate}>저장</Button>]}
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
