import { Button, Title } from 'aliens-design-system-front';
import styled from 'styled-components';

export const Verification = () => {
  return (
    <_Wrapper>
      <_IssueBtn>
        <Button type="contained" color="gray">
          새로 발급하기
        </Button>
      </_IssueBtn>
      <Title display="block" fontSize="s">
        확인코드
      </Title>
      <_VerificationCode display="block" fontSize="l" color="gray6">
        a1s2d3f4
      </_VerificationCode>
    </_Wrapper>
  );
};

const _VerificationCode = styled(Title)`
  margin-top: 24px;
`;

const _Wrapper = styled.div`
  width: 500px;
  height: 180px;
  box-shadow: 0px 1px 20px rgba(204, 204, 204, 0.24);
  border-radius: 4px;
  padding: 40px 0 0 40px;
`;

const _IssueBtn = styled.div`
  position: relative;
  > button {
    position: absolute;
    right: 32px;
    top: -8px;
  }
`;
