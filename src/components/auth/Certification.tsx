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
import { Steps } from '@/pages/auth/ResetPage';
import {
  checkEmailAuthCode,
  checkEmailDuplicate,
  postEmailAuthCode,
} from '@/apis/auth';
import { useErrorMessage } from '@/hooks/useErrorMessage';

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
  const [emailHint, setEmailHint] = useState('');
  const onClickNextButton = useCallback(() => {
    if (step === 'ACCOUNT_ID') {
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
    } else if (step === 'EMAIL') {
      postEmailAuthCode({
        email,
        type: 'PASSWORD',
      })
        .then(() => {
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
    } else {
      checkEmailAuthCode(email, auth_code, 'PASSWORD')
        .then(() => {
          changeErrorMessage('auth_code', '');
        })
        .catch((err: AxiosError) => {
          changeErrorMessage('auth_code', '인증코드가 일치하지 않습니다.');
        });
      setStep('RESET');
    }
  }, [step, setStep]);
  return (
    <>
      <_IdInput
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
          <_SeeEmailWrapper>
            <_SeeEmailTitle>
              <Text fontSize="s">아이디와 일치하는 이메일입니다.</Text>
            </_SeeEmailTitle>
            <Text fontSize="s" color="primary">
              {emailHint}
            </Text>
          </_SeeEmailWrapper>
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
        <>
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
          <_ReAuthCodeWrapper>
            <_ReAuthCodeText>인증번호가 발송되지 않았나요?</_ReAuthCodeText>
            <_ReAuthCodeButton>인증번호 재발송</_ReAuthCodeButton>
          </_ReAuthCodeWrapper>
        </>
      )}
      <_NextButton
        onClick={onClickNextButton}
        size="default"
        color="primary"
        type="contained"
      >
        인증
      </_NextButton>
    </>
  );
}

const _IdInput = styled(Input)`
  margin-top: 56px;
  margin-bottom: 40px;
`;

const _EmailInput = styled(Input)`
  margin-bottom: 40px;
`;

const _AuthCodeInput = styled(Input)`
  margin-bottom: 40px;
  position: relative;
`;

const _ReAuthCodeWrapper = styled.div`
  display: flex;
  position: absolute;
  right: 145px;
  bottom: 267px;
`;

const _ReAuthCodeText = styled.p`
  color: ${({ theme }) => theme.color.gray5};
  font-size: ${({ theme }) => theme.textFont.xs.size}px;
  font-weight: ${({ theme }) => theme.textFont.xs.weight};
  margin-right: 12px;
`;

const _ReAuthCodeButton = styled.p`
  text-decoration: underline;
  color: ${({ theme }) => theme.color.gray6};
  font-weight: 600;
  font-size: ${({ theme }) => theme.textFont.xs.size}px;
`;

const _SeeEmailWrapper = styled.div`
  margin-top: 16px;
  margin-bottom: 40px;
  padding: 12px 16px;
  width: 480px;
  height: 70px;
  background-color: ${({ theme }) => theme.color.gray2};
`;

const _SeeEmailTitle = styled.div`
  margin-bottom: 8px;
`;

const _NextButton = styled(Button)`
  margin-left: auto;
`;
