import styled from 'styled-components';
import { Input, Button } from 'aliens-design-system-front';
import {
  ChangeEvent, Dispatch, SetStateAction, useState,
} from 'react';
import { AxiosError } from 'axios';
import { Steps } from '@/pages/ResetPwdPage';
import {
  checkEmailAuthCode,
  checkEmailDuplicate,
  postEmailAuthCode,
} from '@/apis/auth';
import { useErrorMessage } from '@/hooks/useErrorMessage';
import { useToast } from '@/hooks/useToast';
import { Email } from '@/components/auth/findAccount/Email';
import { AuthCode } from '@/components/auth/findAccount/AuthCode';

interface PropsType {
  account_id: string;
  auth_code: string;
  email: string;
  onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
  step: Steps;
  setStep: Dispatch<SetStateAction<Steps>>;
}

const errorTypes = ['account_id', 'auth_code', 'email'] as const;

export function Certification({
  account_id,
  auth_code,
  email,
  onChangeValue,
  setStep,
  step,
}: PropsType) {
  const { errorMessages, changeErrorMessage } = useErrorMessage(errorTypes);
  const { toastDispatch } = useToast();
  const [emailHint, setEmailHint] = useState('');
  const checkEmail = () => {
    checkEmailDuplicate(account_id)
      .then((res) => {
        setStep('EMAIL');
        setEmailHint(res.email);
        changeErrorMessage('account_id', '');
      })
      .catch((err: AxiosError) => {
        if (err.response.status === 404) {
          changeErrorMessage(
            'account_id',
            '일치하는 아이디가 존재하지 않습니다.',
          );
        }
      });
  };
  const postEmailCode = (type?: 'resend') => {
    if (!email) {
      changeErrorMessage('email', '이메일을 입력해 주세요.');
      return;
    }
    postEmailAuthCode({
      email,
      type: 'PASSWORD',
    })
      .then(() => {
        if (type === 'resend') {
          toastDispatch({
            actionType: 'APPEND_TOAST',
            toastType: 'INFORMATION',
            message: `${emailHint}으로 인증코드가 재전송 되었습니다.`,
          });
          return;
        }
        setStep('AUTH_CODE');
        changeErrorMessage('email', '');
      })
      .catch((err: AxiosError) => {
        if (err.response.status === 404) {
          changeErrorMessage(
            'email',
            '입력하신 이메일이 아이디 정보와 일치하지 않습니다.',
          );
        }
      });
  };
  const checkEmailCode = () => {
    checkEmailAuthCode(email, auth_code, 'PASSWORD')
      .then(() => {
        setStep('RESET');
        changeErrorMessage('auth_code', '');
        toastDispatch({
          actionType: 'APPEND_TOAST',
          toastType: 'SUCCESS',
          message: '인증에 성공했습니다.',
        });
      })
      .catch(() => {
        changeErrorMessage('auth_code', '인증코드가 일치하지 않습니다.');
      });
  };
  const verificationBtn = () => {
    if (step === 'ACCOUNT_ID') checkEmail();
    else if (step === 'EMAIL') postEmailCode();
    else checkEmailCode();
  };
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
        onClick={verificationBtn}
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
