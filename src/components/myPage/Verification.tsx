import { Button, Text } from '@team-aliens/design-system';
import styled from 'styled-components';

interface PropsType {
  onClickNewCode: () => void;
  code: string;
}

export function Verification({ onClickNewCode, code }: PropsType) {
  return (
    <_Wrapper>
      <_IssueBtn>
        <Button kind="contained" color="gray" onClick={onClickNewCode}>
          새로 발급하기
        </Button>
      </_IssueBtn>
      <Text display="block" size="titleL">
        확인코드
      </Text>
      <_VerificationCode display="block" size="headlineM" color="gray6">
        {code}
      </_VerificationCode>
    </_Wrapper>
  );
}

const _VerificationCode = styled(Text)`
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
