import styled from 'styled-components';
import {
  Input, CheckBox, Button, Text,
} from 'aliens-design-system-front';
import { AxiosError } from 'axios';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '@/hooks/useForm';
import { TitleBox } from './TitleBox';
import { LoginRequest } from '@/apis/auth/request';
import { login } from '@/apis/auth';
import { useToast } from '@/hooks/useToast';
import { useErrorMessage } from '@/hooks/useErrorMessage';

const errorTypes = ['account_id', 'password'] as const;

export function Login() {
  const savedAccountId = localStorage.getItem('account_id');
  const navigate = useNavigate();
  const { toastDispatch } = useToast();
  const { errorMessages, changeErrorMessage } = useErrorMessage(errorTypes);
  const { onHandleChange, state: loginState } = useForm<LoginRequest>({
    account_id: savedAccountId || '',
    password: '',
  });
  const [autoSave, setAutoSave] = useState<boolean>(savedAccountId && true);

  const onClickLogin = () => {
    if (autoSave) localStorage.setItem('account_id', loginState.account_id);
    else localStorage.removeItem('account_id');

    login(loginState)
      .then((res) => {
        toastDispatch({
          actionType: 'APPEND_TOAST',
          toastType: 'SUCCESS',
          message: '로그인이 완료되었습니다.',
        });
        localStorage.setItem('access_token', res.access_token);
        if (autoSave) localStorage.setItem('refresh_token', res.refresh_token);
        navigate('/');
      })
      .catch((err: AxiosError) => {
        if (err.response.status === 404) {
          changeErrorMessage('account_id', '존재하지 않는 사용자입니다.');
        } else if (err.response.status === 401) {
          changeErrorMessage('password', '비밀번호가 일치하지 않습니다.');
        }
      });
  };
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const onChangeAutoSaveStatus = (status: boolean) => {
    setAutoSave(status);
  };
  return (
    <_Wrapper onSubmit={onSubmit}>
      <_Contents>
        <TitleBox>로그인</TitleBox>
        <_LoginInput
          label="로그인"
          onChange={onHandleChange}
          placeholder="아이디를 입력해주세요"
          width={480}
          type="text"
          name="account_id"
          value={loginState.account_id}
          errorMsg={errorMessages?.account_id}
        />
        <_PasswordInput
          label="비밀번호"
          onChange={onHandleChange}
          placeholder="비밀번호를 입력해주세요"
          width={480}
          type="password"
          name="password"
          value={loginState.password}
          errorMsg={errorMessages?.password}
        />
        <_AutoLoginCheckBox
          disabled={false}
          label="아이디 저장"
          isChecked={autoSave}
          onChangeIsChecked={onChangeAutoSaveStatus}
        />
        <_LoginButton
          type="contained"
          disabled={!loginState.password || !loginState.account_id}
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
