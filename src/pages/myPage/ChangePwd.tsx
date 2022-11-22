import { WithNavigatorBar } from '@/components/WithNavigatorBar';
import { useForm } from '@/hooks/useForm';
import { Title, Button, Text, Input } from 'aliens-design-system-front';
import styled from 'styled-components';

interface PwdStateType {
  before: string;
  after: string;
  afterConfirmation: string;
}

export const ChangePwd = () => {
  const { onHandleChange, state: pwdState } = useForm<PwdStateType>({
    before: '',
    after: '',
    afterConfirmation: '',
  });
  const { before, after, afterConfirmation } = pwdState;

  return (
    <WithNavigatorBar>
      <_Wrapper>
        <Title fontSize="l">비밀번호 변경</Title>
        <_Description display="block" fontSize="xs" color="gray5">
          비밀번호는 영문, 숫자, 기호를 포함한 8~20자이어야 합니다.
        </_Description>
        <_Input
          label="기존 비밀번호 입력"
          placeholder="기존 비밀번호를 입력해주세요."
          onChange={onHandleChange}
          name="before"
          value={before}
          type="password"
        />
        <_Input
          label="새 비밀번호 입력"
          placeholder="새로운 비밀번호를 입력해주세요."
          onChange={onHandleChange}
          name="after"
          value={after}
          type="password"
        />
        <_Input
          label="새 비밀번호 확인"
          placeholder="새로운 비밀번호를 다시 입력해주세요."
          onChange={onHandleChange}
          name="afterConfirmation"
          value={afterConfirmation}
          type="password"
        />
        <_CompletionBtn>
          <Button
            disabled={
              after === '' || afterConfirmation === '' || before === ''
                ? true
                : false
            }
            type="contained"
          >
            완료
          </Button>
        </_CompletionBtn>
      </_Wrapper>
    </WithNavigatorBar>
  );
};

const _CompletionBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;
`;

const _Wrapper = styled.div`
  margin: 200px 0 0 320px;
`;

const _Description = styled(Text)`
  width: 480px;
  padding: 7px 0 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.primary};
`;

const _BreadCrumb = styled.div`
  height: 22px;
  width: 100px;
  background-color: ${({ theme }) => theme.color.gray6};
`;

const _Input = styled(Input)`
  margin-top: 40px;
`;
