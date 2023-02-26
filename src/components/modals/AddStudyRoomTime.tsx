import { Modal, Button, Input } from '@team-aliens/design-system';
import styled from 'styled-components';
import { useForm } from '@/hooks/useForm';
import { useToast } from '@/hooks/useToast';

export interface ApplicationTime {
  startHour: string;
  startMin: string;
  endHour: string;
  endMin: string;
}

interface PropsType {
  type: 'CREATE' | 'EDIT';
  close: () => void;
  startAt: string;
  endAt: string;
  onClick?: (state: ApplicationTime) => void;
}

export function AddStudyRoomTimeModal({
  type,
  close,
  startAt,
  endAt,
  onClick,
}: PropsType) {
  const { state, onHandleChange } = useForm<ApplicationTime>({
    startHour: startAt.slice(0, 2),
    startMin: startAt.slice(3, 5),
    endHour: endAt.slice(0, 2),
    endMin: endAt.slice(3, 5),
  });
  const { toastDispatch } = useToast();

  const Confirm = () => {
    toastDispatch({
      actionType: 'APPEND_TOAST',
      toastType: 'SUCCESS',
      message: `자습실 사용 시간이 ${
        type === 'CREATE' ? '추가' : '수정'
      }되었습니다.`,
    });
    onClick(state);
    close();
  };

  return (
    <Modal
      title="자습실 사용 시간 설정"
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
      buttonList={[
        <Button
          disabled={
            !state.startMin ||
            !state.startHour ||
            !state.endMin ||
            !state.endHour
          }
          onClick={Confirm}
        >
          {type === 'CREATE' ? '생성' : '수정'}
        </Button>,
      ]}
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
