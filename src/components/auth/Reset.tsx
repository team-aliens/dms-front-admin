import styled from 'styled-components';
import { Input, Button } from 'aliens-design-system-front';
import { useForm } from '@/hooks/useForm';
import { TitleBox } from './TitleBox';

interface ResetPassword {
  new_password: string;
  re_password: string;
}

export function Reset() {
  const { onHandleChange, state: newPasswordState } = useForm<ResetPassword>({
    new_password: '',
    re_password: '',
  });

  const onClickSubmit = () => {};

  return (
    <_Wrapper>
      <TitleBox>비밀번호 재설정</TitleBox>
      <_Contents>
        <_NewPassword
          label="새 비밀번호 입력"
          placeholder="새로운 비밀번호를 입력해주세요."
          width={480}
          type="password"
          name="new_password"
          onChange={onHandleChange}
          value={newPasswordState.new_password}
        />
        <_RePassword
          label="새 비밀번호 확인"
          placeholder="새로운 비밀번호를 다시 확인해주세요."
          width={480}
          type="password"
          name="re_password"
          onChange={onHandleChange}
          value={newPasswordState.re_password}
        />
        <_SubmitPassword
          size="default"
          color="primary"
          type="contained"
          onClick={onClickSubmit}
        >
          완료
        </_SubmitPassword>
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

const _NewPassword = styled(Input)`
  margin-top: 56px;
`;

const _RePassword = styled(Input)`
  margin-top: 40px;
`;

const _SubmitPassword = styled(Button)`
  margin-left: auto;
  margin-top: 40px;
`;
