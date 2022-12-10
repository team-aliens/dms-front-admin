import styled from 'styled-components';
import { Input, Button } from 'aliens-design-system-front';
import { ChangeEvent } from 'react';
import { Steps } from '@/pages/ResetPwdPage';
import { Email } from '@/components/auth/findAccount/Email';
import { AuthCode } from '@/components/auth/findAccount/AuthCode';

interface PropsType {
  account_id: string;
  auth_code: string;
  email: string;
  onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
  step: Steps;
  onClick: () => void;
  errorMessages?: {
    account_id: string;
    auth_code: string;
    email: string;
  };
  emailHint: string;
  postEmailCode: () => void;
}

export function Certification({
  account_id,
  auth_code,
  email,
  onChangeValue,
  step,
  onClick,
  errorMessages,
  emailHint,
  postEmailCode,
}: PropsType) {
  return (
    <>
      <_AccountIdInput
        label="아이디"
        placeholder="id를 입력해주세요."
        onChange={onChangeValue}
        width={480}
        type="text"
        name="account_id"
        value={account_id}
        errorMsg={errorMessages?.account_id}
      />
      {step !== 'RESET' && step !== 'ACCOUNT_ID' && (
        <Email
          emailHint={emailHint}
          onChangeValue={onChangeValue}
          email={email}
          errorMessage={errorMessages?.email}
        />
      )}
      {step === 'AUTH_CODE' && (
        <AuthCode
          auth_code={auth_code}
          errorMessage={errorMessages?.auth_code || ''}
          onClickPostEmailAuthCode={postEmailCode}
          onChangeValue={onChangeValue}
        />
      )}
      <_NextButton
        onClick={onClick}
        size="default"
        color="primary"
        type="contained"
      >
        인증
      </_NextButton>
    </>
  );
}

const _AccountIdInput = styled(Input)`
  margin-top: 56px;
  margin-bottom: 40px;
`;

const _NextButton = styled(Button)`
  margin-left: auto;
`;
