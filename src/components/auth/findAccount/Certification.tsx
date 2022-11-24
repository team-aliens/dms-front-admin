import styled from 'styled-components';
import { Input, Text, Button } from 'aliens-design-system-front';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import { AxiosError } from 'axios';
import { Steps } from '@/pages/ResetPasswordPage';
import {
  checkEmailAuthCode,
  checkEmailDuplicate,
  postEmailAuthCode,
} from '@/apis/auth';
import { useErrorMessage } from '@/hooks/useErrorMessage';
import { useToast } from '@/hooks/useToast';

interface Props {
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
}: Props) {
  const { errorMessages, changeErrorMessage } = useErrorMessage(errorTypes);
  const { toastDispatch } = useToast();
  const [emailHint, setEmailHint] = useState('');
  const onClickCheckEmail = () => {
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
  const onClickPostEmailAuthCode = (type?: 'resend') => {
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
  const onClickCheckEmailAuthCode = () => {
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
      .catch((err: AxiosError) => {
        changeErrorMessage('auth_code', '인증코드가 일치하지 않습니다.');
      });
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
        <>
          <_EmailHintBox>
            <Text fontSize="s" display="block">
              아이디와 일치하는 이메일입니다.
            </Text>
            <Text fontSize="s" color="primary">
              {emailHint}
            </Text>
          </_EmailHintBox>
          <_EmailInput
            label="이메일"
            placeholder="이메일을 입력해주세요"
            onChange={onChangeValue}
            width={480}
            type="text"
            name="email"
            value={email}
            errorMsg={errorMessages?.email}
          />
        </>
      )}
      {step === 'AUTH_CODE' && (
        <_AuthCodeArea>
          <_AuthCodeInput
            label="인증코드"
            name="auth_code"
            onChange={onChangeValue}
            type="text"
            width={480}
            placeholder="이메일로 발송된 인증코드를 입력해주세요."
            value={auth_code}
            errorMsg={errorMessages?.auth_code}
          />
          <_ReSendAuthCodeWrapper>
            <_ResendQuestion fontSize="s" color="gray6">
              인증번호가 발송되지 않았나요?
            </_ResendQuestion>
            <Button
              onClick={() => onClickPostEmailAuthCode('resend')}
              color="gray"
              type="underline"
              clickType="button"
              size="default"
            >
              인증번호 재발송
            </Button>
          </_ReSendAuthCodeWrapper>
        </_AuthCodeArea>
      )}
      <_NextButton
        onClick={() => {
          if (step === 'ACCOUNT_ID') onClickCheckEmail();
          else if (step === 'EMAIL') onClickPostEmailAuthCode();
          else onClickCheckEmailAuthCode();
        }}
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

const _EmailInput = styled(Input)`
  margin-bottom: 40px;
`;

const _ResendQuestion = styled(Text)`
  margin-right: 12px;
`;

const _EmailHintBox = styled.div`
  margin: 16px 0 40px 0;
  padding: 12px 16px;
  width: 480px;
  height: 70px;
  background-color: ${({ theme }) => theme.color.gray2};
  > p {
    // 디자인 시스템 구축시 반영 예정
    line-height: 24px;
  }
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

const _NextButton = styled(Button)`
  margin-left: auto;
`;
