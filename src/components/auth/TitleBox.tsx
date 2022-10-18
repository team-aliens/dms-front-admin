import styled from 'styled-components';
import { Title } from 'aliens-design-system-front';

interface TitleProps {
  children: React.ReactNode;
}

export function TitleBox({ children }: TitleProps) {
  return (
    <_TitleWrapper>
      <div className="textWrapper">
        <Title fontSize="l">{children}</Title>
      </div>
      <hr />
    </_TitleWrapper>
  );
}

const _TitleWrapper = styled.h1`
  width: 480px;
  .textWrapper {
    padding-bottom: 24px;
  }
  > hr {
    width: 480px;
    height: 1px;
    background-color: ${({ theme }) => theme.color.primary};
  }
`;
