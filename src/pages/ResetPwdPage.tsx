import { FormEvent, useState } from 'react';
import styled from 'styled-components';
import { Reset } from '@/components/auth/reset/Reset';
import { Certification } from '@/components/auth/findAccount/Certification';
import { useForm } from '@/hooks/useForm';
import { ResetPasswordRequest } from '@/apis/managers/request';
import { TitleBox } from '@/components/auth/TitleBox';
import { AuthTemplate } from '@/components/auth/AuthTemplate';

export type Steps = 'ACCOUNT_ID' | 'EMAIL' | 'AUTH_CODE' | 'RESET';

const requireArray = ['RESET'];

type RequiredMsg = {
  [keys in typeof requireArray[number]]: string;
};

const requiredMsg: RequiredMsg = {
  RESET: '비밀번호는 영문, 숫자, 기호를 포함한 8~20자이어야 합니다.',
};

export function ResetPwdPage() {
  const [step, setStep] = useState<Steps>('ACCOUNT_ID');

  const { state: resetPasswordState, onHandleChange } =
    useForm<ResetPasswordRequest>({
      account_id: '',
      auth_code: '',
      email: '',
      new_password: '',
    });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <AuthTemplate>
      <_Wrapper>
        <form onSubmit={onSubmit}>
          <TitleBox moreInfo={requiredMsg[step]}>비밀번호 재설정</TitleBox>
          {step === 'RESET' ? (
            <Reset
              onChangeValue={onHandleChange}
              resetPasswordState={resetPasswordState}
            />
          ) : (
            <Certification
              onChangeValue={onHandleChange}
              account_id={resetPasswordState.account_id}
              auth_code={resetPasswordState.auth_code}
              email={resetPasswordState.email}
              step={step}
              setStep={setStep}
            />
          )}
        </form>
      </_Wrapper>
    </AuthTemplate>
  );
}

const _Wrapper = styled.div`
  width: 50%;
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
