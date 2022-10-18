import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, CheckBox, Button } from 'aliens-design-system-front';

const _Wrapper = styled.div`
  display: flex;
`;

const _InputWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const _InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 56px;
`;

const _LoginInputWrapper = styled.div``;

const _PasswordInputWrapper = styled.div`
  padding-top: 40px;
`;

const _CheckInputWrapper = styled.div`
  padding-top: 60px;
  padding-bottom: 36px;
`;

const _SubmitInputWrapper = styled.div`
  padding-bottom: 62px;
`;

const _ChoiceWrapper = styled.div`
  display: flex;
  justify-content: center;
  #btn {
    cursor: pointer;
  }
  #bar {
    font-size: 14px;
    font-weight: 600;
    padding: 0 32px;
  }
`;

export function Login() {
  const [inputData, setInputData] = useState({
    id: '',
    password: '',
  });

  const onChangeID = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData({ id: e.target.value, ...inputData });
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData({ password: e.target.value, ...inputData });
  };

  return (
    <_Wrapper>
      <_InputWrapper>
        <_InputDiv>
          <_LoginInputWrapper>
            <Input
              label="로그인"
              onChange={onChangeID}
              placeholder="아이디를 입력해주세요"
              width={480}
              type="text"
            />
          </_LoginInputWrapper>
          <_PasswordInputWrapper>
            <Input
              label="비밀번호"
              onChange={onChangePassword}
              placeholder="비밀번호를 입력해주세요"
              width={480}
              type="password"
            />
          </_PasswordInputWrapper>
          <_CheckInputWrapper>
            <CheckBox disabled={false} label="아이디 저장" />
          </_CheckInputWrapper>
          <_SubmitInputWrapper>
            <Button
              type="contained"
              disabled={inputData.password === ''}
              color="primary"
              size="medium"
            >
              로그인
            </Button>
          </_SubmitInputWrapper>
          <_ChoiceWrapper>
            <p id="btn">아이디 찾기</p>
            <p id="bar">|</p>
            <p id="btn">비밀번호 변경</p>
          </_ChoiceWrapper>
        </_InputDiv>
      </_InputWrapper>
    </_Wrapper>
  );
}
