import { ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import {
  Input, DropDown, Button, Text,
} from 'aliens-design-system-front';
import { fadeInRight } from '../../animation/fade';
import { Question } from '../reset/Question';
import { SchoolInformation } from '@/apis/schools/response';

interface PropsType {
  schools: SchoolInformation[];
  selectedSchoolName: string;
  onDropDownChange: (value: string) => void;
  isNextStep: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  answer: string;
  question: string;
  onClick: () => void;
}

export function FindAccountId({
  schools,
  onDropDownChange,
  selectedSchoolName,
  isNextStep,
  onChange,
  answer,
  question,
  onClick,
}: PropsType) {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <_Wrapper>
      <form onSubmit={onSubmit}>
        <_TitleWrapper display="block">아이디 찾기</_TitleWrapper>
        <_DropDown
          width={480}
          label="학교 이름"
          placeholder="학교를 선택해주세요"
          value={selectedSchoolName}
          disable={false}
          onChange={onDropDownChange}
          items={schools.map((i) => i.name)}
        />
        <_QNA nextStep={isNextStep}>
          <Question question={question} />
          <Input
            label="답변"
            placeholder="답변을 작성해주세요."
            width={480}
            type="text"
            name="answer"
            onChange={onChange}
            value={answer}
          />
        </_QNA>
        <_BtnWrapper>
          <Button
            type="contained"
            color="primary"
            size="default"
            onClick={onClick}
          >
            다음
          </Button>
        </_BtnWrapper>
      </form>
    </_Wrapper>
  );
}

const _QNA = styled.div<{ nextStep: boolean }>`
  animation: ${fadeInRight} 1s;
  display: ${({ nextStep }) => !nextStep && 'none'};
`;

const _BtnWrapper = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 40px;
`;

const _TitleWrapper = styled(Text)`
  border-bottom: 1px solid ${({ theme }) => theme.color.primary};
  padding-bottom: 24px;
`;

const _DropDown = styled(DropDown)`
  margin-top: 56px;
`;

const _Wrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.25s;
  > div {
    width: 480px;
  }
`;
