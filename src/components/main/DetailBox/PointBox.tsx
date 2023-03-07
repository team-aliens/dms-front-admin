import styled from 'styled-components';
import { Text } from '@team-aliens/design-system';
import { Dispatch, SetStateAction } from 'react';
import { theme } from '@team-aliens/design-system/dist/styles/theme';
import { PointType } from '@/apis/points';

interface Props {
  currentPointType: PointType;
  setCurrentPointType: Dispatch<SetStateAction<PointType>>;
  pointType: PointType;
  point: number;
}

export function PointBox({
  currentPointType,
  setCurrentPointType,
  pointType,
  point,
}: Props) {
  const isCurrent = pointType === currentPointType;
  const onClick = () => {
    if (isCurrent) setCurrentPointType('ALL');
    else setCurrentPointType(pointType);
  };

  return (
    <_Wrapper
      isCurrent={isCurrent || currentPointType === 'ALL'}
      onClick={onClick}
      color={pointType}
    >
      {pointType === 'BONUS' && (
        <>
          <_PointType
            size="bodyS"
            color={
              currentPointType === 'BONUS' || currentPointType === 'ALL'
                ? 'primary'
                : 'gray3'
            }
          >
            {pointType === 'BONUS' ? '상점' : '벌점'}
          </_PointType>
          <_Point
            size="bodyL"
            color={
              currentPointType === 'BONUS' || currentPointType === 'ALL'
                ? 'primary'
                : 'gray3'
            }
          >
            {point}
          </_Point>
        </>
      )}
      {pointType === 'MINUS' && (
        <>
          <_PointType
            size="bodyS"
            color={
              currentPointType === 'MINUS' || currentPointType === 'ALL'
                ? 'error'
                : 'gray3'
            }
          >
            {pointType === 'MINUS' ? '벌점' : '상점'}
          </_PointType>
          <_Point
            size="bodyL"
            color={
              currentPointType === 'MINUS' || currentPointType === 'ALL'
                ? 'error'
                : 'gray3'
            }
          >
            {point}
          </_Point>
        </>
      )}
    </_Wrapper>
  );
}

const _Wrapper = styled.div<{ color?: PointType; isCurrent?: boolean }>`
  width: 172px;
  height: 47px;
  display: flex;
  background-color: ${({ color, isCurrent }) => {
    switch (color) {
      case 'BONUS':
        return isCurrent ? theme.color.primaryLighten2 : theme.color.gray2;
      case 'MINUS':
        return isCurrent ? theme.color.errorLighten2 : theme.color.gray2;
      default:
        return '';
    }
  }};
  border: 1px solid
    ${({ color, isCurrent }) => {
      switch (color) {
        case 'BONUS':
          return isCurrent ? theme.color.primary : theme.color.gray3;
        case 'MINUS':
          return isCurrent ? theme.color.error : theme.color.gray3;
        default:
          return '';
      }
    }};
  padding: 8px 0;
  border-radius: 4px;
  align-items: center;
  cursor: pointer;
`;

const _PointType = styled(Text)`
  width: 50%;
  border-right: 1px solid #eeeeee;
  text-align: center;
`;

const _Point = styled(Text)`
  width: 50%;
  text-align: center;
`;
