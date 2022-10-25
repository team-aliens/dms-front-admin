import styled from 'styled-components';
import {
  Input,
  CheckBox,
  Button,
  Text,
  Title,
} from 'aliens-design-system-front';
import { Link } from 'react-router-dom';
import { useForm } from '@/hooks/useForm';

export function Login() {
  const { onHandleChange, state } = useForm<{ id: string; password: string }>({
    id: '',
    password: '',
  });

  // button onclick 없으면 error 나서 임시로 만들었습니다. api 연결할 때 함수명 바꿔서 쓰셔도 될 것 같아요
  const onHandleClick = () => {};

  return (
    <_Wrapper>
      <_Title>로그인</_Title>
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
        <_PasswordWrapper>
          <Input
            label="비밀번호"
            onChange={onHandleChange}
            placeholder="비밀번호를 입력해주세요"
            width={480}
            type="password"
            name="password"
            value={state.password}
          />
        </_PasswordWrapper>
        <_CheckInputWrapper>
          <CheckBox disabled={false} label="아이디 저장" />
        </_CheckInputWrapper>
        <_SubmitInputWrapper>
          <Button
            type="contained"
            disabled={!state.password}
            color="primary"
            size="medium"
            onClick={onHandleClick}
          >
            로그인
          </Button>
        </_SubmitInputWrapper>
        <_FindAccontWrapper>
          <_FindAccountArea>
            <Link to="/find-id">
              <Text fontSize="s">아이디 찾기</Text>
            </Link>
            <Text fontSize="s">|</Text>
            <Text fontSize="s">비밀번호 변경</Text>
          </_FindAccountArea>
        </_FindAccontWrapper>
      </_InputWrapper>
    </_Wrapper>
  );
}

const _Title = styled(Title)`
  width: 480px;
  border-bottom: 1px solid ${({ theme }) => theme.color.primary};
  padding-bottom: 24px;
`;

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

const _PasswordWrapper = styled.div`
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
