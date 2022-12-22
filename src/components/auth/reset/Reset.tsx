import styled from 'styled-components';
import { Input, Button } from '@team-aliens/design-system';
import { ChangeEvent, useEffect, useState } from 'react';
import { useObj } from '@/hooks/useObj';
import { checkPasswordReg } from '@/utils/regs';
import { ResetPasswordRequest } from '@/apis/managers/request';

interface Props {
  onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
  resetPasswordState: ResetPasswordRequest;
  onClickResetPwd: () => void;
}

interface ErrorPropsType {
  newPassword: string;
}

export function Reset({
  onChangeValue,
  resetPasswordState,
  onClickResetPwd,
}: Props) {
  const { obj: errorMessages, changeObjectValue: changeErrorMessage } =
    useObj<ErrorPropsType>({
      newPassword: '',
    });
  const [checkPassword, setCheckPassword] = useState('');
  const { new_password: newPassword } = resetPasswordState;
  useEffect(() => {
    if (checkPasswordReg(newPassword) || !newPassword) {
      changeErrorMessage('newPassword', '');
    } else if (newPassword.length !== 0) {
      changeErrorMessage('newPassword', '비밀번호 형식이 올바르지 않습니다.');
    }
  }, [newPassword, checkPassword, changeErrorMessage]);
  return (
    <_Wrapper>
      <_Contents>
        <Input
          margin={['top', 56]}
          label="새 비밀번호 입력"
          placeholder="새로운 비밀번호를 입력해주세요."
          width={480}
          type="password"
          name="new_password"
          onChange={onChangeValue}
          value={newPassword}
          errorMsg={errorMessages?.newPassword}
        />
        <Input
          margin={['top', 40]}
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
        <Button
          margin={[
            ['top', 40],
            ['left', 'auto'],
          ]}
          size="default"
          color="primary"
          kind="contained"
          onClick={onClickResetPwd}
          disabled={
            !checkPasswordReg(newPassword) || newPassword !== checkPassword
          }
        >
          완료
        </Button>
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
