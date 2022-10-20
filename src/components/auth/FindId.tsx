import { useState } from 'react';
import styled from 'styled-components';
import { Input, DropDown, Button, Title } from 'aliens-design-system-front';
import { useForm } from '@/hooks/useForm';
import { useDropDown } from '@/hooks/useDropDown';
import { fadeInRight } from '../animation/fade';
import { Question } from './Question';

const schools = ['학교이름1', '학교이름2', '학교이름3'];

export function FindId() {
  const [nextStep, setNextStep] = useState<boolean>(false);
  const { onHandleChange, state: answerState } = useForm<{
    answer: string;
  }>({
    answer: '',
  });

  const { onDropDownChange, sort } = useDropDown<string>('');

  const onClickShowQNA = () => setNextStep(!nextStep);

  const onClickAnswer = () => {};

  return (
    <_Wrapper>
      <div>
        <_TitleWrapper display="block">아이디 찾기</_TitleWrapper>
        <_DropDown
          width={480}
          label={'학교 이름'}
          placeholder="학교를 선택해주세요"
          value={sort}
          disable={false}
          onChange={onDropDownChange}
          items={schools}
        />
        <_QNA nextStep={nextStep}>
          <Question />
          <Input
            label="답변"
            placeholder="답변을 작성해주세요."
            width={480}
            type="text"
            name="answer"
            onChange={onHandleChange}
            value={answerState.answer}
          />
        </_QNA>
        <_BtnWrapper>
          <Button
            type="contained"
            color="primary"
            size="default"
            onClick={nextStep ? onClickAnswer : onClickShowQNA}
          >
            다음
          </Button>
        </_BtnWrapper>
      </div>
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

const _TitleWrapper = styled(Title)`
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
