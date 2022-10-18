import styled from 'styled-components';
import { Input, Text, Button } from 'aliens-design-system-front';
import { useState } from 'react';
import { useForm } from '@/hooks/useForm';
import { TitleBox } from './TitleBox';

export function ResetPassword() {
  const [emailStep, setEmailStep] = useState<boolean>(true);
  const [authCode, setAuthCode] = useState<boolean>(false);

  const { onHandleChange, state } = useForm<{
    id: string;
    email: string;
    authcode: string;
  }>({
    id: '',
    email: '',
    authcode: '',
  });

  return (
    <_Wrapper>
      <TitleBox>비밀번호 재설정</TitleBox>
      <_InputWrapper>
        <Input
          label="아이디"
          placeholder="id를 입력해주세요."
          onChange={onHandleChange}
          width={480}
          type="text"
          name="id"
          value={state.id}
        />
        {emailStep ? (
          <_SeeEmailWrapper>
            <_SeeEmailTitle>
              <Text fontSize="s">아이디와 일치하는 이메일입니다.</Text>
            </_SeeEmailTitle>
            <Text fontSize="s" color="#005DE8">
              bluehome8626@daum.net
            </Text>
          </_SeeEmailWrapper>
        ) : (
          <ButtonWrapper>
            <Button size="default" color="primary" type="contained">
              다음
            </Button>
          </ButtonWrapper>
        )}
      </_InputWrapper>
      <EmailInputWrapper>
        <Input
          label="이메일"
          placeholder="이메일을 입력해주세요"
          onChange={onHandleChange}
          width={480}
          type="text"
          name="email"
          value={state.email}
        />
        {authCode && (
          <ButtonWrapper>
            <Button size="default" color="primary" type="contained">
              다음
            </Button>
          </ButtonWrapper>
        )}
      </EmailInputWrapper>
      <div>
        <Input
          label="인증코드"
          name="authcode"
          onChange={onHandleChange}
          type="text"
          width={480}
          placeholder="이메일로 발송된 인증코드를 입력해주세요."
          value={state.authcode}
        />
      </div>
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

const _InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 56px;
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

const ButtonWrapper = styled.div`
  padding-top: 40px;
  display: flex;
  justify-content: flex-end;
`;

const EmailInputWrapper = styled.div`
  margin-bottom: 60px;
`;
