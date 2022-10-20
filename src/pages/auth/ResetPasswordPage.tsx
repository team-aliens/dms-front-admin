import { FormEvent, useState } from 'react';
import styled from 'styled-components';
import { LogoBox } from '@/components/auth/LogoBox';
import { Reset } from '@/components/auth/Reset';
import { _FlexWrapper } from '@/styles/flexWrapper';
import { Certification } from '@/components/auth/Certification';
import { useForm } from '@/hooks/useForm';
import { ResetPasswordRequest } from '@/apis/managers/request';
import { TitleBox } from '@/components/auth/TitleBox';

export type Steps = 'ACCOUNT_ID' | 'EMAIL' | 'AUTH_CODE' | 'RESET';

export function ResetPasswordPage() {
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
    <_FlexWrapper>
      <LogoBox />
      <_Wrapper>
        <form onSubmit={onSubmit}>
          <_ResetPasswordTitle>비밀번호 재설정</_ResetPasswordTitle>
          {step !== 'RESET' ? (
            <Certification
              onChangeValue={onHandleChange}
              account_id={resetPasswordState.account_id}
              auth_code={resetPasswordState.auth_code}
              email={resetPasswordState.email}
              step={step}
              setStep={setStep}
            />
          ) : (
            <Reset
              onChangeValue={onHandleChange}
              resetPasswordState={resetPasswordState}
            />
          )}
        </form>
      </_Wrapper>
    </_FlexWrapper>
  );
}

const _Wrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const _ResetPasswordTitle = styled(TitleBox)``;
