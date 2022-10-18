import styled from 'styled-components';
import { Title } from 'aliens-design-system-front';

const _TitleWrapper = styled.h1`
  width: 480px;
  .textDiv {
    display: flex;
    justify-content: start;
    padding-bottom: 24px;
  }
  > hr {
    width: 480px;
    background-color: ${({ theme }) => theme.color.primary};
  }
`;

export function TitleBox() {
  return (
    <_TitleWrapper>
      <div className="textDiv">
        <Title fontSize="l">로그인</Title>
      </div>
      <hr />
    </_TitleWrapper>
  );
}
