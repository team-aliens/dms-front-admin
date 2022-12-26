import {
  Input, Modal, Button, Text, Arrow,
} from '@team-aliens/design-system';
import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { ColorPicker, useColor } from 'react-color-palette';
import { CreatSeatTypeRequest } from '@/apis/studyRooms/request';

interface PropsType {
  closeModal: () => void;
}

export function AddSeatType({ closeModal }: PropsType) {
  const [color, setColor] = useColor('hex', '#000000');
  const [seatType, setSeatType] = useState<CreatSeatTypeRequest>({
    name: '',
    color: '',
  });
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSeatType({
      ...seatType,
      name: e.target.value,
    });
  };
  return (
    <Modal
      title=""
      content=""
      close={closeModal}
      inputList={[
        <Input
          onChange={onChange}
          name="name"
          placeholder="상태 이름을 입력해주세요."
          label="종류 이름"
          value={seatType.name}
        />,
      ]}
      buttonList={[
        <Button color="error" kind="outline">
          취소
        </Button>,
        <Button color="primary" kind="contained">
          추가
        </Button>,
      ]}
    >
      <_ColorPallet color={seatType.color}>
        <Text size="bodyS" color="gray6">
          색상
        </Text>
        <div className="color" />
        <ColorPicker
          width={268}
          height={380}
          color={color}
          onChange={() => {}}
          hideHSV
          hideRGB
          dark
        />
        <Arrow size={18} direction="bottom" />
      </_ColorPallet>
    </Modal>
  );
}

const _ColorPallet = styled.div<{
  color: string;
}>`
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
