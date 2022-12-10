import styled from 'styled-components';
import {
  Input, CheckBox, Button, Text,
} from 'aliens-design-system-front';
import { ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { TitleBox } from './TitleBox';
import { LoginRequest } from '@/apis/auth/request';

interface PropsType {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickLogin: () => void;
  disabled: boolean;
  loginState: LoginRequest;
  errorMessage: LoginRequest;
  autoSave: boolean;
  onChangeAutoSaveStatus: (status: boolean) => void;
}

export function Login({
  onChange,
  onClickLogin,
  disabled,
  loginState,
  errorMessage,
  autoSave,
  onChangeAutoSaveStatus,
}: PropsType) {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <_Wrapper onSubmit={onSubmit}>
      <_Contents>
        <TitleBox>로그인</TitleBox>
        <_LoginInput
          label="로그인"
          onChange={onChange}
          placeholder="아이디를 입력해주세요"
          width={480}
          type="text"
          name="account_id"
          value={loginState.account_id}
          errorMsg={errorMessage?.account_id}
        />
        <_PasswordInput
          label="비밀번호"
          onChange={onChange}
          placeholder="비밀번호를 입력해주세요"
          width={480}
          type="password"
          name="password"
          value={loginState.password}
          errorMsg={errorMessage?.password}
        />
        <_AutoLoginCheckBox
          disabled={false}
          label="아이디 저장"
          isChecked={autoSave}
          onChangeIsChecked={onChangeAutoSaveStatus}
        />
        <_LoginButton
          type="contained"
          disabled={disabled}
          color="primary"
          size="medium"
          onClick={onClickLogin}
        >
          로그인
        </_LoginButton>
        <_FindAccountArea>
          <Link to="/find-account-id">
            <Text size="bodyL" color="gray6">
              아이디 찾기
            </Text>
          </Link>
          <Text size="bodyL" color="gray6">
            |
          </Text>
          <Link to="/reset">
            <Text size="bodyL" color="gray6">
              비밀번호 변경
            </Text>
          </Link>
        </_FindAccountArea>
      </_Contents>
    </_Wrapper>
  );
}

const _Wrapper = styled.form`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const _Contents = styled.div`
  margin: 0 auto;
`;

const _LoginInput = styled(Input)`
  margin-top: 56px;
`;

const _PasswordInput = styled(Input)`
  margin-top: 40px;
`;

const _AutoLoginCheckBox = styled(CheckBox)`
  margin-top: 62px;
`;

const _LoginButton = styled(Button)`
  margin-top: 38px;
`;

const _FindAccountArea = styled.div`
  width: 238px;
  margin: 76px auto 0 auto;
  display: flex;
  justify-content: space-between;
  > p {
    cursor: pointer;
  }
`;
