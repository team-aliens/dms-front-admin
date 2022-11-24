import styled from 'styled-components';
import { Text } from 'aliens-design-system-front';

interface Props {
  question: string;
}

export const Question = ({ question }: Props) => {
  return (
    <_QuestionWrapper>
      <_QuestionTitle display="block" fontSize="s">
        학교 인증 질문
      </_QuestionTitle>
      <Text fontSize="m" color="gray6">
        {question}
      </Text>
    </_QuestionWrapper>
  );
};

const _QuestionWrapper = styled.div`
  margin: 16px 0px 40px 0px;
  padding: 12px 16px;
  height: 70px;
  background-color: ${({ theme }) => theme.color.gray2};
`;

const _QuestionTitle = styled(Text)`
  margin-bottom: 8px;
`;
