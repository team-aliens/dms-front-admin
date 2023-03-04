import { Text } from '@team-aliens/design-system';
import { theme } from '@team-aliens/design-system/dist/styles/theme';
import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { StartEndPoint } from '@/components/modals/PointFilter';

interface PropsType {
  min: number;
  max: number;
  minVal: number;
  maxVal: number;
  state: StartEndPoint;
  setState: Dispatch<SetStateAction<StartEndPoint>>;
}

export function MultiRangeSlider({
  min,
  max,
  minVal,
  maxVal,
  state,
  setState,
}: PropsType) {
  const gap = 1;
  const markings = [
    '-100+',
    '-80',
    '-60',
    '-40',
    '-20',
    '0',
    '20',
    '40',
    '60',
    '80',
    '100+',
  ];

  const onChangeValueLeft = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (+maxVal + 100 - (+value + 100) > gap) {
      setState({ ...state, startPoint: +value });
    } else {
      setState({ ...state, startPoint: +maxVal - gap });
    }
  };

  const onChangeValueRight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (+value + 100 - (+minVal + 100) > gap) {
      setState({ ...state, endPoint: +value });
    } else {
      setState({ ...state, endPoint: +minVal + gap });
    }
  };

  const Left = (((+minVal > min ? +minVal : min) + 100) / 200) * 100;
  const Right = 100 - (((+maxVal < max ? +maxVal : max) + 100) / 200) * 100;

  return (
    <>
      <_Marking>
        {markings.map((res) => (
          <Text
            size="captionM"
            color={
              (+res.replace('+', '') === 100 && +maxVal > 100) ||
              (+res.replace('+', '') === -100 && +minVal < -100) ||
              +res.replace('+', '') === +minVal ||
              +res.replace('+', '') === +maxVal
                ? 'gray8'
                : 'gray4'
            }
          >
            {res}
          </Text>
        ))}
      </_Marking>
      <_Inputs>
        <_Progress left={Left} right={Right} />
        <_Range
          onChange={onChangeValueLeft}
          type="range"
          min={min}
          max={max}
          value={minVal}
        />
        <_Range
          onChange={onChangeValueRight}
          type="range"
          min={min}
          max={max}
          value={maxVal}
        />
      </_Inputs>
    </>
  );
}

export default MultiRangeSlider;

const _Marking = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  > * {
    display: flex;
    justify-content: center;
    width: 30px;
  }
`;

const _Inputs = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 96%;
  margin: 0 auto;
  background-color: ${theme.color.primaryLighten1};
  border-radius: 5px;
  height: 5px;
  input[type='range']::-webkit-slider-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50px;
    -webkit-appearance: none;
    pointer-events: auto;
    background-color: ${theme.color.primaryDarken1};
  }
`;

const _Progress = styled.div<{ left: number; right: number }>`
  position: absolute;
  display: flex;
  align-items: center;
  left: ${({ left }) => `${left}%`};
  right: ${({ right }) => `${right}%`};
  height: 5px;
  border-radius: 50px;
  background-color: ${theme.color.primaryDarken1};
`;

const _Range = styled.input`
  position: absolute;
  background: none;
  width: 100%;
  pointer-events: none;
  -webkit-appearance: none;
  cursor: pointer;
`;
