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
      <Text display="block" color="gray6" size="titleS" margin={[16, 0, 40, 0]}>
        {question}
      </Text>
      <Text size="titleL" display="block">
        답변
      </Text>
      <Text color="gray6" size="titleS" display="block" margin={['top', 16]}>
        {answer}
      </Text>
    </_Wrapper>
  );
}

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
