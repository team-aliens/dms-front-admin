import styled from 'styled-components';
import { Text } from '@team-aliens/design-system';
import { theme } from '@team-aliens/design-system/dist/styles/theme';
import { PointType } from '@/apis/points';

interface Props {
  pointType: PointType;
  point: number;
}

export function PointBox({ pointType, point }: Props) {
  return (
    <_Wrapper color={pointType}>
      <_PointType
        size="bodyS"
        color={pointType === 'BONUS' ? 'primary' : 'error'}
      >
        {pointType === 'BONUS' ? '상점' : '벌점'}
      </_PointType>
      <_Point size="bodyL" color={pointType === 'BONUS' ? 'primary' : 'error'}>
        {point}
      </_Point>
    </_Wrapper>
  );
}

const _Wrapper = styled.div<{ color?: PointType }>`
  width: 172px;
  height: 47px;
  display: flex;
  background-color: ${({ color }) => {
    switch (color) {
      case 'BONUS':
        return theme.color.primaryLighten2;
      case 'MINUS':
        return theme.color.errorLighten2;
      default:
        return theme.color.gray3;
    }
  }};
  border: 1px solid
    ${({ color }) => {
      switch (color) {
        case 'BONUS':
          return theme.color.primary;
        case 'MINUS':
          return theme.color.error;
        default:
          return theme.color.gray2;
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
