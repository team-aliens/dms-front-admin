import styled, { css } from 'styled-components';
import { Text } from '@team-aliens/design-system';

interface TitleProps {
  children: React.ReactNode;
  moreInfo?: string;
}

export function TitleBox({ children, moreInfo = '' }: TitleProps) {
  return (
    <_TitleWrapper>
      <Text size="headlineM" color="gray10">
        {children}
      </Text>
      {moreInfo && <_Requirements>{moreInfo}</_Requirements>}
      <hr />
    </_TitleWrapper>
  );
}

const _TitleWrapper = styled.h1`
  width: 480px;
  > hr {
    margin-top: 23px;
    width: 480px;
    height: 1px;
    background-color: ${({ theme }) => theme.color.primary};
  }
`;

const _Requirements = styled.p`
  ${({ theme }) => css`
    ${theme.font.captionM}
  `};
  color: ${({ theme }) => theme.color.gray5};
  margin: 8px 0 20px 0;
`;
