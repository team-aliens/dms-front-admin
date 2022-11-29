import styled from 'styled-components';
import { Title } from 'aliens-design-system-front';

interface TitleProps {
  children: React.ReactNode;
  moreInfo?: string;
}

export function TitleBox({ children, moreInfo = '' }: TitleProps) {
  return (
    <_TitleWrapper>
      <Title fontSize="l">{children}</Title>
      {moreInfo && <_Requirements>{moreInfo}</_Requirements>}
      <hr />
    </_TitleWrapper>
  );
}

const _TitleWrapper = styled.h1`
  width: 480px;
  > hr {
    width: 480px;
    height: 1px;
    background-color: ${({ theme }) => theme.color.primary};
  }
`;

const _Requirements = styled.p`
  font-size: ${({ theme }) => theme.textFont.xs.size}px;
  font-weight: ${({ theme }) => theme.textFont.xs.weight};
  color: ${({ theme }) => theme.color.gray5};
  margin: 8px 0 20px 0;
`;
