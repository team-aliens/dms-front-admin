import { Input, Modal, Button, Text, Arrow } from '@team-aliens/design-system';
import { useState } from 'react';
import styled from 'styled-components';
import { ChromePicker, ColorResult } from 'react-color';
import OutsideClickHandler from 'react-outside-click-handler';
import { useCreateSeatType } from '@/apis/studyRooms';
import { useForm } from '@/hooks/useForm';
import { CreatSeatTypeRequest } from '@/apis/studyRooms/request';

interface PropsType {
  closeModal: () => void;
  refetchTypeList: () => void;
}

export function AddSeatType({ closeModal, refetchTypeList }: PropsType) {
  const [pickerOpened, setPickerOpened] = useState(false);
  const { state, onHandleChange, setState } = useForm<CreatSeatTypeRequest>({
    name: '',
    color: '#000000',
  });
  const changeColor = (color: ColorResult) => {
    setState({
      ...state,
      color: color.hex,
    });
  };
  const createSeatType = useCreateSeatType(state, {
    onSuccess: () => {
      closeModal();
      refetchTypeList();
    },
  });
  return (
    <Modal
      title=""
      content=""
      close={closeModal}
      inputList={[
        <Input
          onChange={onHandleChange}
          name="name"
          placeholder="종류 이름을 입력해주세요."
          label="종류 이름"
          value={state.name}
        />,
      ]}
      buttonList={[
        <Button color="error" kind="outline">
          취소
        </Button>,
        <Button
          color="primary"
          kind="contained"
          onClick={createSeatType.mutate}
        >
          추가
        </Button>,
      ]}
    >
      <_ColorPallet color={state.color}>
        <Text size="bodyS" color="gray6">
          색상
        </Text>
        <div className="color" />
        <button onClick={() => setPickerOpened((prev) => !prev)} type="button">
          <Arrow size={18} direction={pickerOpened ? 'top' : 'bottom'} />
        </button>
        {pickerOpened && (
          <OutsideClickHandler
            onOutsideClick={() => setPickerOpened((prev) => !prev)}
          >
            <_ColorPicker color={state.color} onChange={changeColor} />
          </OutsideClickHandler>
        )}
      </_ColorPallet>
    </Modal>
  );
}

const _ColorPallet = styled.div<{
  color: string;
}>`
  position: relative;
  display: flex;
  margin-top: 36px;
  margin-bottom: 65px;
  > .color {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: ${({ color, theme }) => color || theme.color.gray7};
    margin: 0 12px 0 auto;
  }
`;

const _ColorPicker = styled(ChromePicker)`
  position: absolute;
  right: 0;
  top: 40px;
`;
