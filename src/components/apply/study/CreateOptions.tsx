import { Close, Input } from '@team-aliens/design-system';
import styled from 'styled-components';
import React, { ChangeEvent } from 'react';
import { StudyRoomErrorMessage } from '@/apis/studyRooms/request';

interface PropsType {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  floor: number;
  name: string;
  total_width_size: number;
  total_height_size: number;
  errorMessages: StudyRoomErrorMessage;
  errorChange: () => boolean;
}

export function CreateStudyRoomOptions({
  onChange,
  floor,
  name,
  total_height_size,
  total_width_size,
  errorMessages,
  errorChange,
}: PropsType) {
  return (
    <_Wrapper>
      <Input
        onChange={onChange}
        name="floor"
        value={floor || ''}
        label="층"
        width={160}
        placeholder="ex) 4"
        type="number"
        errorMsg={errorMessages?.floor}
      />
      <Input
        onChange={onChange}
        name="name"
        value={name}
        label="자습실 이름"
        width={328}
        margin={['left', 30]}
        errorMsg={errorMessages?.name}
        placeholder="ex) 대마고만의 자습실"
      />
      <Input
        onChange={onChange}
        name="total_width_size"
        value={total_width_size || ''}
        label="자습실 크기"
        width={160}
        type="number"
        margin={[
          ['left', 32],
          ['right', 10],
        ]}
        placeholder="ex) 0"
      />
      <Close colorKey="gray5" size={18} />
      <Input
        onChange={onChange}
        name="total_height_size"
        value={total_height_size || ''}
        width={160}
        type="number"
        margin={[
          ['left', 10],
          ['top', 'auto'],
        ]}
        placeholder="ex) 0"
      />
    </_Wrapper>
  );
}

const _Wrapper = styled.div`
  display: flex;
  > svg {
    margin-top: auto;
    margin-bottom: 13px;
  }
`;
