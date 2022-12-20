import styled from 'styled-components';
import { Input, Button } from '@team-aliens/design-system';
import { FormEvent } from 'react';
import { WithNavigatorBar } from '@/components/WithNavigatorBar';
import { useForm } from '@/hooks/useForm';
import { ChangePasswordRequest } from '@/apis/users/request';
import { TitleBox } from '@/components/auth/TitleBox';
import { useChangePwd, useCheckPwd } from '@/hooks/useUsersApi';
import { useToast } from '@/hooks/useToast';
import { BreadCrumbWrapper } from '@/components/BreadCrumb';

interface ChangePwdPropsType extends ChangePasswordRequest {
  reCheckPassword: string;
}

const pathToKorean = {
  'my-page': '마이페이지',
  'change-pwd': '비밀번호 변경',
};

export function ChangePwd() {
  const {
    onHandleChange,
    state: { current_password, new_password, reCheckPassword },
  } = useForm<ChangePwdPropsType>({
    current_password: '',
    new_password: '',
    reCheckPassword: '',
  });

  const { toastDispatch } = useToast();

  const { refetch } = useCheckPwd(current_password);
  const { mutate } = useChangePwd({
    current_password,
    new_password,
  });

  const change = () => {
    if (new_password !== reCheckPassword) {
      toastDispatch({
        toastType: 'ERROR',
        actionType: 'APPEND_TOAST',
        message: '확인 비밀번호가 일치하지 않습니다.',
      });
    } else refetch().then(() => mutate());
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <WithNavigatorBar>
      <_Wrapper>
        <BreadCrumbWrapper margin="86px 0 0 80px" pathToKorean={pathToKorean} />
        <_InputsWrapper onSubmit={onSubmit}>
          <TitleBox moreInfo="비밀번호는 영문, 숫자, 기호를 포함한 8~20자이어야 합니다.">
            비밀번호 변경
          </TitleBox>
          <_Input
            value={current_password}
            onChange={onHandleChange}
            name="current_password"
            placeholder="기존 비밀번호를 입력해주세요."
            label="기존 비밀번호 입력"
            type="password"
          />
          <_Input
            value={new_password}
            onChange={onHandleChange}
            name="new_password"
            placeholder="새로운 비밀번호를 입력해주세요."
            label="새 비밀번호 입력"
            type="password"
          />
          <_Input
            value={reCheckPassword}
            onChange={onHandleChange}
            name="reCheckPassword"
            placeholder="새로운 비밀번호를 다시 입력해주세요."
            label="새 비밀번호 확인"
            type="password"
          />
          <_Button
            kind="contained"
            color="primary"
            onClick={change}
            disabled={!(current_password && new_password && reCheckPassword)}
          >
            완료
          </_Button>
        </_InputsWrapper>
      </_Wrapper>
    </WithNavigatorBar>
  );
}

const _Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100vw - 250px);
`;

const _InputsWrapper = styled.form`
  margin: 92px auto 0 auto;
`;

const _Input = styled(Input)`
  margin-top: 40px;
`;

const _Button = styled(Button)`
  margin-left: auto;
  margin-top: 40px;
`;
