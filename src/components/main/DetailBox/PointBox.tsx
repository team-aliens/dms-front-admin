import styled from 'styled-components';
import { Text } from '@team-aliens/design-system';

interface Props {
  pointType: 'BONUS' | 'MINUS';
  point: number;
}

export function PointBox({ pointType, point }: Props) {
  return (
    <_Wrapper>
      <_PointType size="bodyS" color="gray6">
        {pointType === 'BONUS' ? '상점' : '벌점'}
      </_PointType>
      <_Point size="bodyL" color="gray10">
        {point}
      </_Point>
    </_Wrapper>
  );
}

const _Wrapper = styled.div`
  width: 172px;
  height: 47px;
  display: flex;
  background-color: ${({ theme }) => theme.color.gray2};
  border: 1px solid ${({ theme }) => theme.color.gray3};
  padding: 8px 0;
  border-radius: 4px;
  align-items: center;
`;

const _PointType = styled(Text)`
  width: 50%;
  border-right: 1px solid ${({ theme }) => theme.color.gray3};
  text-align: center;
`;

const _Point = styled(Text)`
  width: 50%;
  text-align: center;
`;
