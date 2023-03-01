import styled from 'styled-components';
import { Input, Button } from '@team-aliens/design-system';
import { ChangeEvent, useState } from 'react';
import { checkPasswordReg } from '@/utils/regs';
import { ResetPasswordRequest } from '@/apis/managers/request';

interface Props {
  onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
  resetPasswordState: ResetPasswordRequest;
  onClickResetPwd: () => void;
}

export function Reset({
  onChangeValue,
  resetPasswordState,
  onClickResetPwd,
}: Props) {
  const [checkPassword, setCheckPassword] = useState('');
  const { new_password: newPassword } = resetPasswordState;
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
