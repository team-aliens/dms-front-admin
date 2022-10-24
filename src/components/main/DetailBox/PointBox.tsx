import styled from 'styled-components';

interface Props {
  pointType: 'BONUS' | 'MINUS';
  point: number;
}

export function PointBox({ pointType, point }: Props) {
  return (
    <_Wrapper>
      <_PointType>{pointType === 'BONUS' ? '상점' : '벌점'}</_PointType>
      <_Point>4</_Point>
    </_Wrapper>
  );
}

const _Wrapper = styled.div`
  width: 172px;
  height: 47px;
  display: flex;
  background-color: ${({ theme }) => theme.color.gray2};
  border: 1px solid ${({ theme }) => theme.color.gray3};
  padding: 8px 24px;
  border-radius: 4px;
  align-items: center;
`;

const _PointType = styled.p`
  padding-right: 24px;
  border-right: 1px solid ${({ theme }) => theme.color.gray3};
  font-size: ${({ theme }) => theme.textFont.s.size}px;
  font-weight: ${({ theme }) => theme.textFont.s.weight};
  color: ${({ theme }) => theme.color.gray5};
`;

const _Point = styled.p`
  margin: 0 auto;
  font-size: ${({ theme }) => theme.textFont.l.size}px;
  font-weight: ${({ theme }) => theme.textFont.l.weight};
  color: ${({ theme }) => theme.color.gray9};
`;
