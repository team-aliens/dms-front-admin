import { Input, Text } from 'aliens-design-system-front';
import styled from 'styled-components';
import { ChangeEvent } from 'react';

interface PropsType {
  emailHint: string;
  onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
  email: string;
  errorMessage: string;
}

export function Email({
  emailHint,
  onChangeValue,
  email,
  errorMessage,
}: PropsType) {
  return (
    <>
      <_EmailHintBox>
        <Text fontSize="s" display="block">
          아이디와 일치하는 이메일입니다.
        </Text>
        <Text fontSize="s" color="primary">
          {emailHint}
        </Text>
      </_EmailHintBox>
      <_EmailInput
        label="이메일"
        placeholder="이메일을 입력해주세요"
        onChange={onChangeValue}
        width={480}
        type="text"
        name="email"
        value={email}
        errorMsg={errorMessage}
      />
    </>
  );
}

const _EmailHintBox = styled.div`
  margin: 16px 0 40px 0;
  padding: 12px 16px;
  width: 480px;
  height: 70px;
  background-color: ${({ theme }) => theme.color.gray2};
`;

const _EmailInput = styled(Input)`
  margin-bottom: 40px;
`;
