import styled from 'styled-components';
import { Title, Input, CheckBox, Button } from 'aliens-design-system-front';

const Wrapper = styled.div`
  display: flex;
`;

const ImgWrapper = styled.div`
  width: 50%;
  box-shadow: 0px 2px 40px rgba(52, 52, 52, 0.1);
`;

const InputWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleDiv = styled.div`
  width: 480px;
  .textDiv {
    display: flex;
    justify-content: start;
  }
  .Hr {
    width: 100%;
    height: 1px;
    background-color: #3d8aff;
  }
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 56px;
`;

const LoginInputDiv = styled.div``;

const PasswordInputDiv = styled.div`
  padding-top: 40px;
`;

const CheckInputDiv = styled.div`
  padding-top: 60px;
  padding-bottom: 36px;
`;

const SubmitInputDiv = styled.div`
  padding-bottom: 62px;
`;

const ChoiceDiv = styled.div`
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

function Login() {
  return (
    <Wrapper>
      <ImgWrapper>
        <img src="" alt="" />
      </ImgWrapper>
      <InputWrapper>
        <TitleDiv>
          <div className="textDiv">
            <Title fontSize="l">로그인</Title>
          </div>
          <div className="Hr" />
        </TitleDiv>
        <InputDiv>
          <LoginInputDiv>
            <Input
              label="로그인"
              placeholder="아이디를 입력해주세요"
              width={480}
              type="text"
            />
          </LoginInputDiv>
          <PasswordInputDiv>
            <Input
              label="비밀번호"
              placeholder="비밀번호를 입력해주세요"
              width={480}
              type="password"
            />
          </PasswordInputDiv>
          <CheckInputDiv>
            <CheckBox disabled={false} />
          </CheckInputDiv>
          <SubmitInputDiv>
            <Button type="contained" color="primary">
              로그인
            </Button>
          </SubmitInputDiv>
          <ChoiceDiv>
            <p id="btn">아이디 찾기</p>
            <p id="bar">|</p>
            <p id="btn">비밀번호 변경</p>
          </ChoiceDiv>
        </InputDiv>
      </InputWrapper>
    </Wrapper>
  );
}

export default Login;
