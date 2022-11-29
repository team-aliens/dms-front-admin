import styled from 'styled-components';
import { Button, Title } from 'aliens-design-system-front';

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
      <_PatchQuetion>
        <Button type="contained" color="gray" onClick={openNewQuestionModal}>
          질문과 답변 변경하기
        </Button>
      </_PatchQuetion>
      <Title display="block" fontSize="s">
        확인 질문
      </Title>
      <_ConfirmationQuestion display="block" color="gray6" fontSize="xs">
        {question}
      </_ConfirmationQuestion>
      <Title fontSize="s" display="block">
        답변
      </Title>
      <_Answer color="gray6" fontSize="xs" display="block">
        {answer}
      </_Answer>
    </_Wrapper>
  );
}

const _ConfirmationQuestion = styled(Title)`
  margin: 16px 0 40px 0;
`;

const _Answer = styled(Title)`
  margin-top: 16px;
`;

const _Wrapper = styled.div`
  width: 500px;
  box-shadow: 0px 1px 20px rgba(204, 204, 204, 0.24);
  border-radius: 4px;
  margin-left: 30px;
  padding: 40px 0 0 40px;
`;

const _PatchQuetion = styled.div`
  position: relative;
  > button {
    position: absolute;
    right: 32px;
    top: -8px;
  }
`;
