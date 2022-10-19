import styled from 'styled-components';
import { Input, Text, Button } from 'aliens-design-system-front';
import { useState } from 'react';
import { useForm } from '@/hooks/useForm';
import { TitleBox } from './TitleBox';

interface CertificationProps {
  id: string;
  email: string;
  auth_code: string;
}

export function Certification() {
  const [emailStep, setEmailStep] = useState<boolean>(false);
  const [authCode, setAuthCode] = useState<boolean>(false);

  const { onHandleChange, state: CertificationState } =
    useForm<CertificationProps>({
      id: '',
      email: '',
      auth_code: '',
    });

  const onClickEmail = () => {
    setEmailStep(!emailStep);
  };

  const onClickAuthCode = () => {
    setAuthCode(!authCode);
  };

  const onClickNextStep = () => {};

  return (
    <_Wrapper>
      <TitleBox>비밀번호 재설정</TitleBox>
      <_Contents>
        <_IdInput
          label="아이디"
          placeholder="id를 입력해주세요."
          onChange={onHandleChange}
          width={480}
          type="text"
          name="id"
          value={CertificationState.id}
        />
        {emailStep ? (
          <>
            <_SeeEmailWrapper>
              <_SeeEmailTitle>
                <Text fontSize="s">아이디와 일치하는 이메일입니다.</Text>
              </_SeeEmailTitle>
              <Text fontSize="s" color="primary">
                bluehome8626@daum.net
              </Text>
            </_SeeEmailWrapper>
            <_EmailInput
              label="이메일"
              placeholder="이메일을 입력해주세요"
              onChange={onHandleChange}
              width={480}
              type="text"
              name="email"
              value={CertificationState.email}
            />
            {!authCode && (
              <_NextButton
                onClick={onClickAuthCode}
                size="default"
                color="primary"
                type="contained"
              >
                다음
              </_NextButton>
            )}
          </>
        ) : (
          <_NextButton
            onClick={onClickEmail}
            size="default"
            color="primary"
            type="contained"
          >
            다음
          </_NextButton>
        )}
        {authCode && (
          <>
            <_AuthCodeInput
              label="인증코드"
              name="authcode"
              onChange={onHandleChange}
              type="text"
              width={480}
              placeholder="이메일로 발송된 인증코드를 입력해주세요."
              value={CertificationState.auth_code}
            />
            <_NextButton
              onClick={onClickNextStep}
              size="default"
              color="primary"
              type="contained"
            >
              인증
            </_NextButton>
          </>
        )}
      </_Contents>
    </_Wrapper>
  );
}

const _Wrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const _Contents = styled.div`
  margin: 0 auto;
`;

const _IdInput = styled(Input)`
  margin-top: 56px;
  margin-bottom: 40px;
`;

const _EmailInput = styled(Input)`
  margin-bottom: 40px;
`;

const _AuthCodeInput = styled(Input)`
  margin-bottom: 40px;
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
