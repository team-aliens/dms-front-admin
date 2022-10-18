import { useState } from 'react';
import styled from 'styled-components';
import { Input, DropDown, Button, Text } from 'aliens-design-system-front';
import { useForm } from '@/hooks/useForm';
import { useDropDown } from '@/hooks/useDropDown';
import { TitleBox } from './TitleBox';

const exampleData = ['1', '2'];

export function FindId() {
  const [nextStep, setNextStep] = useState<boolean>(true);

  const { onHandleChange, state } = useForm<{
    answer: string;
  }>({
    answer: '',
  });

  const { onDropDownChange, sort } = useDropDown<string>('');

  return (
    <_Wrapper>
      <TitleBox>아이디 찾기</TitleBox>
      <_DropDownWrapper>
        <DropDown
          width={480}
          placeholder="학교를 선택해주세요"
          value={sort}
          disable={false}
          onChange={onDropDownChange}
          items={exampleData}
        />
        {nextStep ? (
          <_QuestionWrapper>
            <_QuestionTitle>
              <Text fontSize="s">학교 인증 질문</Text>
            </_QuestionTitle>
            <Text fontSize="m" color="#55555">
              학교 학생 수는 몇 명인가요?
            </Text>
          </_QuestionWrapper>
        ) : (
          <_ButtonWrapper>
            <Button size="default" color="primary" type="contained">
              다음
            </Button>
          </_ButtonWrapper>
        )}
      </_DropDownWrapper>
      {nextStep && (
        <div>
          <Input
            label="답변"
            placeholder="답변을 작성해주세요."
            width={480}
            type="text"
            name="answer"
            onChange={onHandleChange}
            value={state.answer}
          />
          <_ButtonWrapper>
            <Button type="contained" color="primary" size="default">
              다음
            </Button>
          </_ButtonWrapper>
        </div>
      )}
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

const _DropDownWrapper = styled.div`
  padding-top: 56px;
`;

const _ButtonWrapper = styled.div`
  padding-top: 40px;
  display: flex;
  justify-content: flex-end;
`;

const _QuestionWrapper = styled.div`
  margin-top: 16px;
  margin-bottom: 40px;
  padding: 12px 16px;
  width: 480px;
  height: 70px;
  background-color: ${({ theme }) => theme.color.gray2};
`;

const _QuestionTitle = styled.div`
  margin-bottom: 8px;
`;
