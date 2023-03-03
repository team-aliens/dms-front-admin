import styled from 'styled-components';
import { Input, CheckBox, Button, Text } from '@team-aliens/design-system';
import { ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { TitleBox } from './TitleBox';
import { LoginRequest } from '@/apis/auth/request';
import { pagePath } from '@/utils/pagePath';

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
        <Input
          margin={['top', 56]}
          label="로그인"
          onChange={onChange}
          placeholder="아이디를 입력해주세요"
          width={480}
          type="text"
          name="account_id"
          value={loginState.account_id}
          errorMsg={errorMessage?.account_id}
        />
        <Input
          margin={['top', 40]}
          label="비밀번호"
          onChange={onChange}
          placeholder="비밀번호를 입력해주세요"
          width={480}
          type="password"
          name="password"
          value={loginState.password}
          errorMsg={errorMessage?.password}
        />
        <CheckBox
          disabled={false}
          label="아이디 저장"
          status={autoSave}
          onChange={onChangeAutoSaveStatus}
          margin={['top', 62]}
        />
        <Button
          margin={['top', 38]}
          kind="contained"
          disabled={disabled}
          color="primary"
          size="medium"
          onClick={onClickLogin}
        >
          로그인
        </Button>
        <_FindAccountArea>
          <Link to={pagePath.findAccountId}>
            <Text size="bodyL" color="gray6">
              아이디 찾기
            </Text>
          </Link>
          <Text size="bodyL" color="gray6">
            |
          </Text>
          <Link to={pagePath.resetPassword}>
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

const _FindAccountArea = styled.div`
  width: 238px;
  margin: 76px auto 0 auto;
  display: flex;
  justify-content: space-between;
  > p {
    cursor: pointer;
  }
`;
