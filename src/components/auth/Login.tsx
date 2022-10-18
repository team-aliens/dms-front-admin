import styled from 'styled-components';
import { Input, CheckBox, Button, Text } from 'aliens-design-system-front';
import { useForm } from '@/hooks/useForm';
import { TitleBox } from './TitleBox';

export function Login() {
  const { onHandleChange, state } = useForm<{ id: string; password: string }>({
    id: '',
    password: '',
  });

  return (
    <_Wrapper>
      <TitleBox />
      <_InputWrapper>
        <Input
          label="로그인"
          onChange={onHandleChange}
          placeholder="아이디를 입력해주세요"
          width={480}
          type="text"
          name="id"
          value={state.id}
        />
        <_PasswordInputWrapper>
          <Input
            label="비밀번호"
            onChange={onHandleChange}
            placeholder="비밀번호를 입력해주세요"
            width={480}
            type="password"
            name="password"
            value={state.password}
          />
        </_PasswordInputWrapper>
        <_CheckInputWrapper>
          <CheckBox disabled={false} label="아이디 저장" />
        </_CheckInputWrapper>
        <_SubmitInputWrapper>
          <Button
            type="contained"
            disabled={!state.password}
            color="primary"
            size="medium"
          >
            로그인
          </Button>
        </_SubmitInputWrapper>
        <_FindAccontWrapper>
          <_FindAccountArea>
            <Text fontSize="s" cursor="pointer">
              아이디 찾기
            </Text>
            <Text fontSize="s">|</Text>
            <Text fontSize="s" cursor="pointer">
              비밀번호 변경
            </Text>
          </_FindAccountArea>
        </_FindAccontWrapper>
      </_InputWrapper>
    </_Wrapper>
  );
}

const _Wrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const _InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 56px;
`;

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

const _FindAccontWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const _FindAccountArea = styled.div`
  width: 238px;
  display: flex;
  justify-content: space-between;
`;
