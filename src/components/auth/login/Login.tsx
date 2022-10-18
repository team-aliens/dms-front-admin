import React, { useState } from 'react';
import styled from 'styled-components';
import { Title, Input, CheckBox, Button } from 'aliens-design-system-front';

const Wrapper = styled.div`
  display: flex;
`;

const ImgWrapper = styled.div`
  width: 50%;
  height: 100vh;
  max-height: 100vh;
  box-shadow: 0px 2px 40px rgba(52, 52, 52, 0.1);
`;

const InputWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleWrapper = styled.h1`
  width: 480px;
  .textDiv {
    display: flex;
    justify-content: start;
    padding-bottom: 24px;
  }
  > hr {
    width: 480px;
    background-color: #3d8aff;
  }
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 56px;
`;

const LoginInputWrapper = styled.div``;

const PasswordInputWrapper = styled.div`
  padding-top: 40px;
`;

const CheckInputWrapper = styled.div`
  padding-top: 60px;
  padding-bottom: 36px;
`;

const SubmitInputWrapper = styled.div`
  padding-bottom: 62px;
`;

const ChoiceWrapper = styled.div`
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

export const Login = () => {
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
    <Wrapper>
      <ImgWrapper>
        <img src="" alt="" />
      </ImgWrapper>
      <InputWrapper>
        <TitleWrapper>
          <div className="textDiv">
            <Title fontSize="l">로그인</Title>
          </div>
          <hr />
        </TitleWrapper>
        <InputDiv>
          <LoginInputWrapper>
            <Input
              label="로그인"
              onChange={onChangeID}
              placeholder="아이디를 입력해주세요"
              width={480}
              type="text"
            />
          </LoginInputWrapper>
          <PasswordInputWrapper>
            <Input
              label="비밀번호"
              onChange={onChangePassword}
              placeholder="비밀번호를 입력해주세요"
              width={480}
              type="password"
            />
          </PasswordInputWrapper>
          <CheckInputWrapper>
            <CheckBox disabled={false} label="아이디 저장" />
          </CheckInputWrapper>
          <SubmitInputWrapper>
            <Button
              type="contained"
              disabled={inputData.password === ''}
              color="primary"
              size="medium"
            >
              로그인
            </Button>
          </SubmitInputWrapper>
          <ChoiceWrapper>
            <p id="btn">아이디 찾기</p>
            <p id="bar">|</p>
            <p id="btn">비밀번호 변경</p>
          </ChoiceWrapper>
        </InputDiv>
      </InputWrapper>
    </Wrapper>
  );
};
