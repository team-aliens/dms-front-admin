import { Button, Input, Text } from '@team-aliens/design-system';
import { ChangeEvent } from 'react';
import styled from 'styled-components';

interface PropsType {
  auth_code: string;
  errorMessage: string;
  onClickPostEmailAuthCode: (type?: 'resend') => void;
  onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function AuthCode({
  auth_code,
  errorMessage,
  onClickPostEmailAuthCode,
  onChangeValue,
}: PropsType) {
  return (
    <_AuthCodeArea>
      <_AuthCodeInput
        label="인증코드"
        name="auth_code"
        onChange={onChangeValue}
        type="text"
        width={480}
        placeholder="이메일로 발송된 인증코드를 입력해주세요."
        value={auth_code}
        errorMsg={errorMessage}
      />
      <_ReSendAuthCodeWrapper>
        <_ResendQuestion size="captionM" color="gray6">
          인증번호가 발송되지 않았나요?
        </_ResendQuestion>
        <Button
          onClick={() => onClickPostEmailAuthCode('resend')}
          color="gray"
          kind="underline"
          clickType="button"
          size="default"
        >
          인증번호 재발송
        </Button>
      </_ReSendAuthCodeWrapper>
    </_AuthCodeArea>
  );
}

const _ResendQuestion = styled(Text)`
  margin-right: 12px;
`;

const _AuthCodeArea = styled.div`
  position: relative;
  margin-top: 60px;
`;

const _ReSendAuthCodeWrapper = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  top: -5px;
  > button {
    padding: 0;
  }
`;

const _AuthCodeInput = styled(Input)`
  margin-bottom: 40px;
`;
