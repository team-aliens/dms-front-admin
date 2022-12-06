import {
  FormEvent, useCallback, useEffect, useState,
} from 'react';
import styled from 'styled-components';
import { Reset } from '@/components/auth/reset/Reset';
import { Certification } from '@/components/auth/findAccount/Certification';
import { useForm } from '@/hooks/useForm';
import { ResetPasswordRequest } from '@/apis/managers/request';
import { TitleBox } from '@/components/auth/TitleBox';
import { AuthTemplate } from '@/components/auth/AuthTemplate';
import {
  useCheckEmailAuthCode,
  useCheckEmailDuplicate,
  usePostEmailAuthCodeMutation,
  useResetPwdMutation,
} from '@/hooks/useAuthApi';
import { useObj } from '@/hooks/useObj';

export type Steps = 'ACCOUNT_ID' | 'EMAIL' | 'AUTH_CODE' | 'RESET';

const requireArray = ['RESET'];

interface ErrorPropsType {
  account_id: string;
  auth_code: string;
  email: string;
}

type RequiredMsg = {
  [keys in typeof requireArray[number]]: string;
};

const requiredMsg: RequiredMsg = {
  RESET: '비밀번호는 영문, 숫자, 기호를 포함한 8~20자이어야 합니다.',
};

export function ResetPwdPage() {
  const [step, setStep] = useState<Steps>('ACCOUNT_ID');
  const [emailHint, setEmailHint] = useState('');
  const { state: resetPwdState, onHandleChange } =
    useForm<ResetPasswordRequest>({
      account_id: '',
      auth_code: '',
      email: '',
      new_password: '',
    });
  const { email, account_id, auth_code } = resetPwdState;

  const { obj: errorMessages, changeObjectValue: changeErrorMessage } =
    useObj<ErrorPropsType>({
      account_id: '',
      auth_code: '',
      email: '',
    });

  const resetPwd = useResetPwdMutation({ resetPwdState });
  const checkAuthCode = useCheckEmailAuthCode({
    email,
    authCode: auth_code,
  });
  const checkEmail = useCheckEmailDuplicate(account_id);

  useEffect(() => {
    if (checkAuthCode.isSuccess) {
      setStep('RESET');
      changeErrorMessage('auth_code', '');
    }
  }, [checkAuthCode.isSuccess, changeErrorMessage]);

  useEffect(() => {
    if (checkAuthCode.isError) {
      changeErrorMessage('auth_code', '인증코드가 일치하지 않습니다.');
    }
  }, [checkAuthCode.isError, changeErrorMessage]);

  useEffect(() => {
    if (checkEmail.isSuccess && checkEmail.data) {
      setStep('EMAIL');
      setEmailHint(checkEmail.data.email);
      changeErrorMessage('account_id', '');
    }
  }, [checkEmail.isSuccess, checkEmail.data]);

  const postEmail = usePostEmailAuthCodeMutation({
    email,
  });

  const postEmailCode = useCallback(
    (type?: 'resend') => {
      if (!email) {
        changeErrorMessage('email', '이메일을 입력해 주세요.');
        return;
      }
      if (type === 'resend') postEmail.mutate('RESEND', {});
      else {
        postEmail.mutate(undefined, {
          onSuccess: () => {
            setStep('AUTH_CODE');
            changeErrorMessage('email', '');
          },
        });
      }
    },
    [email, changeErrorMessage, postEmail, setStep],
  );

  const verificationBtn = useCallback(() => {
    if (step === 'ACCOUNT_ID') {
      return checkEmail.refetch();
    }
    if (step === 'EMAIL') return postEmailCode();
    return checkEmail.refetch();
  }, [step, postEmailCode, checkEmail]);

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
              resetPasswordState={resetPwdState}
              onClickResetPwd={() => resetPwd.mutate()}
            />
          ) : (
            <Certification
              onChangeValue={onHandleChange}
              account_id={resetPwdState.account_id}
              auth_code={resetPwdState.auth_code}
              email={resetPwdState.email}
              step={step}
              errorMessages={errorMessages}
              emailHint={emailHint}
              onClick={verificationBtn}
              postEmailCode={postEmailCode}
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
