import styled from 'styled-components';
import { Input, Button } from 'aliens-design-system-front';
import { ChangeEvent, useEffect, useState } from 'react';
import { useErrorMessage } from '@/hooks/useErrorMessage';
import { checkPasswordReg } from '@/utils/regs';

interface Props {
  onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
  newPassword: string;
}

const errorTypes = ['newPassword'] as const;

export function Reset({ onChangeValue, newPassword }: Props) {
  const { errorMessages, changeErrorMessage } = useErrorMessage(errorTypes);
  const [checkPassword, setCheckPassword] = useState('');
  const onClickSubmit = () => {};
  useEffect(() => {
    if (checkPasswordReg(newPassword) || !newPassword) {
      changeErrorMessage('newPassword', '');
    } else if (newPassword.length !== 0) {
      changeErrorMessage('newPassword', '비밀번호 형식이 올바르지 않습니다.');
    }
  }, [newPassword, checkPassword]);
  return (
    <_Wrapper>
      <_Contents>
        <_NewPassword
          label="새 비밀번호 입력"
          placeholder="새로운 비밀번호를 입력해주세요."
          width={480}
          type="password"
          name="new_password"
          onChange={onChangeValue}
          value={newPassword}
          errorMsg={errorMessages?.newPassword}
        />
        <_RePassword
          label="새 비밀번호 확인"
          placeholder="새로운 비밀번호를 다시 확인해주세요."
          width={480}
          type="password"
          name="re_password"
          onChange={(e) => setCheckPassword(e.target.value)}
          value={checkPassword}
          errorMsg={
            checkPasswordReg(newPassword) &&
            checkPassword &&
            checkPassword !== newPassword &&
            '비밀번호가 일치하지 않습니다.'
          }
        />
        <_SubmitPassword
          size="default"
          color="primary"
          type="contained"
          onClick={onClickSubmit}
          disabled={newPassword !== checkPassword}
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
