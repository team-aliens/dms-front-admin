import { Close, Input } from '@team-aliens/design-system';
import styled from 'styled-components';
import { ChangeEvent } from 'react';

interface PropsType {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  floor: number;
  name: string;
  total_width_size: number;
  total_height_size: number;
}

export function CreateStudyRoomOptions({
  onChange,
  floor,
  name,
  total_height_size,
  total_width_size,
}: PropsType) {
  return (
    <_Wrapper>
      <Input
        onChange={onChange}
        name="floor"
        value={floor}
        label="층 입력"
        width={160}
        placeholder="ex) 4"
        type="number"
      />
      <Input
        onChange={onChange}
        name="name"
        value={name}
        label="자습실 이름"
        width={328}
        margin={['left', 30]}
        placeholder="ex) 대마고만의 자습실"
      />
      <Input
        onChange={onChange}
        name="total_width_size"
        value={total_width_size}
        label="자습실 크기"
        width={160}
        type="number"
        margin={[
          ['left', 32],
          ['right', 10],
        ]}
        placeholder="0"
      />
      <Close colorKey="gray5" size={18} />
      <Input
        onChange={onChange}
        name="total_height_size"
        value={total_height_size}
        width={160}
        type="number"
        margin={[
          ['left', 10],
          ['top', 'auto'],
        ]}
        placeholder="0"
      />
    </_Wrapper>
  );
}

const _Wrapper = styled.div`
  margin-top: 32px;
  display: flex;
  > svg {
    margin-top: auto;
    margin-bottom: 13px;
  }
`;
