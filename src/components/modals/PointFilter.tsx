import { Button, Input, Modal, Text } from '@team-aliens/design-system';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MultiRangeSlider from '@/components/MultiRangeSlider';
import { useForm } from '@/hooks/useForm';
import { PointEnum, PointType } from '@/apis/points';

interface PropsType {
  filterType: PointType;
  minPoint: number;
  maxPoint: number;
  onChangeFilterType: (type: PointType) => void;
  onChangeLimitPoint: (startPoint: number, endPoint: number) => void;
  close: () => void;
}

export interface StartEndPoint {
  startPoint: number;
  endPoint: number;
}

const FilterType: PointType[] = ['ALL', 'BONUS', 'MINUS'];

export function PointFilterModal({
  filterType,
  minPoint,
  maxPoint,
  onChangeFilterType,
  close,
  onChangeLimitPoint,
}: PropsType) {
  const [pointType, setPointType] = useState<PointType>(filterType);
  const { state, onHandleChange, setState } = useForm<StartEndPoint>({
    startPoint: minPoint,
    endPoint: maxPoint,
  });

  const { startPoint, endPoint } = state;

  const onClick = () => {
    onChangeFilterType(pointType);
    onChangeLimitPoint(startPoint ?? 0, endPoint ?? 0);
    close();
  };

  return (
    <Modal
      buttonList={[
        <Button kind="contained" onClick={onClick}>
          적용
        </Button>,
      ]}
      close={close}
      title="필터"
    >
      <_Buttons>
        {FilterType.map((type) => (
          <_Button
            onClick={() => setPointType(type)}
            isClicked={type === pointType}
          >
            {PointEnum[type]}
          </_Button>
        ))}
      </_Buttons>
      <Text margin={[40, 0]} size="bodyM">
        점수 범위
      </Text>
      <MultiRangeSlider
        state={state}
        min={-100}
        max={100}
        minVal={startPoint}
        maxVal={endPoint}
        setState={setState}
      />
      <_Inputs>
        <Input
          width={96}
          label="시작 점수"
          name="startPoint"
          value={startPoint}
          onChange={onHandleChange}
          limit={endPoint}
          type="number"
        />
        <p>~</p>
        <Input
          width={96}
          label="끝 점수"
          name="endPoint"
          value={endPoint}
          onChange={onHandleChange}
          type="number"
        />
      </_Inputs>
    </Modal>
  );
}

const _Buttons = styled.div`
  display: flex;
  gap: 10px;
`;

const _Inputs = styled.div`
  display: flex;
  align-items: center;
  margin-top: 35px;
  > p {
    margin: 30px 20px 0 20px;
  }
`;

const _Button = styled.div<{ isClicked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px 16px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.color.gray4};
  background-color: ${({ isClicked, theme }) =>
    isClicked ? theme.color.gray3 : theme.color.gray1};
  ${({ theme }) => theme.font.BtnM};
  color: ${({ theme }) => theme.color.gray6};
  cursor: pointer;
`;
