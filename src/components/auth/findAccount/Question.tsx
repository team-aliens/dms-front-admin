import styled from 'styled-components';
import { Text } from 'aliens-design-system-front';

export const Question = () => {
  return (
    <_QuestionWrapper>
      <_QuestionTitle display="block" fontSize="s">
        학교 인증 질문
      </_QuestionTitle>
      <Text fontSize="m" color="gray6">
        학교 학생 수는 몇 명인가요?
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
