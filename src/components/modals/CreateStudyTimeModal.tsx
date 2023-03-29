import { Button, DropDown, Modal } from '@team-aliens/design-system';
import styled from 'styled-components';
import { useCreateTimeSlots } from '@/apis/studyRooms';
import { useForm } from '@/hooks/useForm';
import { useToast } from '@/hooks/useToast';

interface PropsType {
  closeModal: () => void;
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

export default function CreateStudyTimeModal({ closeModal }: PropsType) {
  const { state: studyTimeState, setState } = useForm<IUseForm>({
    start_hour: '00',
    start_min: '00',
    end_hour: '00',
    end_min: '00',
  });
  const { mutateAsync } = useCreateTimeSlots({
    body: {
      start_time: `${studyTimeState.start_hour}:${studyTimeState.start_min}`,
      end_time: `${studyTimeState.end_hour}:${studyTimeState.end_min}`,
    },
  });
  const { toastDispatch } = useToast();

  const onClick = () => {
    mutateAsync().then(() => {
      toastDispatch({
        toastType: 'SUCCESS',
        actionType: 'APPEND_TOAST',
        message: '자습실 이용 시간이 추가되었습니다.',
      });
      closeModal();
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
            placeholder="00"
            value={studyTimeState.start_hour}
            items={hourToArray}
            onChange={(value) => onChange('start_hour', value)}
          ></DropDown>
          <p>:</p>
          <DropDown
            placeholder="00"
            value={studyTimeState.start_min}
            items={minToArray}
            onChange={(value) => onChange('start_min', value)}
          ></DropDown>
          <p className="to">~</p>
          <DropDown
            placeholder="00"
            value={studyTimeState.end_hour}
            items={hourToArray}
            onChange={(value) => onChange('end_hour', value)}
          ></DropDown>
          <p>:</p>
          <DropDown
            placeholder="00"
            value={studyTimeState.end_min}
            items={minToArray}
            onChange={(value) => onChange('end_min', value)}
          ></DropDown>
        </_Wrapper>,
      ]}
      buttonList={[<Button onClick={onClick}>생성</Button>]}
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
