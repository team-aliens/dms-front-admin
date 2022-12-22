import { Input, Button } from '@team-aliens/design-system';
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
      <Input
        margin={[56, 0, 40, 0]}
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
      <Button
        margin={['left', 'auto']}
        onClick={onClick}
        size="default"
        color="primary"
        kind="contained"
      >
        인증
      </Button>
    </>
  );
}
