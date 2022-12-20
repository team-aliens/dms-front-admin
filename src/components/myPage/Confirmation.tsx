import styled from 'styled-components';
import { Button, Text } from '@team-aliens/design-system';

interface PropsType {
  openNewQuestionModal: () => void;
  question: string;
  answer: string;
}

export function Confirmation({
  openNewQuestionModal,
  question,
  answer,
}: PropsType) {
  return (
    <_Wrapper>
      <_PatchQuestion>
        <Button kind="contained" color="gray" onClick={openNewQuestionModal}>
          질문과 답변 변경하기
        </Button>
      </_PatchQuestion>
      <Text display="block" size="titleL">
        확인 질문
      </Text>
      <_ConfirmationQuestion display="block" color="gray6" size="titleS">
        {question}
      </_ConfirmationQuestion>
      <Text size="titleL" display="block">
        답변
      </Text>
      <_Answer color="gray6" size="titleS" display="block">
        {answer}
      </_Answer>
    </_Wrapper>
  );
}

const _ConfirmationQuestion = styled(Text)`
  margin: 16px 0 40px 0;
`;

const _Answer = styled(Text)`
  margin-top: 16px;
`;

const _Wrapper = styled.div`
  width: 500px;
  box-shadow: 0 1px 20px rgba(204, 204, 204, 0.24);
  border-radius: 4px;
  margin-left: 30px;
  padding: 40px 0 0 40px;
`;

const _PatchQuestion = styled.div`
  position: relative;
  > button {
    position: absolute;
    right: 32px;
    top: -8px;
  }
`;
