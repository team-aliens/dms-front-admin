import styled from 'styled-components';
import { Text } from 'aliens-design-system-front';

interface Props {
  pointType: 'BONUS' | 'MINUS';
  point: number;
}

export function PointBox({ pointType, point }: Props) {
  return (
    <_Wrapper>
      <_PointType fontSize="s" color="gray5">
        {pointType === 'BONUS' ? '상점' : '벌점'}
      </_PointType>
      <_Point fontSize="l" color="gray9">
        4
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
