import { FormEvent, useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  Input, DropDown, Button, Title,
} from 'aliens-design-system-front';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@/hooks/useForm';
import { useDropDown } from '@/hooks/useDropDown';
import { fadeInRight } from '../../animation/fade';
import { Question } from '../reset/Question';
import { SchoolInformation } from '@/apis/schools/response';
import { queryKeys } from '@/utils/queryKeys';
import { getSchoolQuestion } from '@/apis/schools';
import { useToast } from '@/hooks/useToast';
import { findId } from '@/apis/managers';

interface PropsType {
  schools: SchoolInformation[];
}

export function FindAccountId({ schools }: PropsType) {
  const [nextStep, setNextStep] = useState<boolean>(false);
  const navigate = useNavigate();
  const { toastDispatch } = useToast();
  const { onHandleChange, state: answerState } = useForm<{
    answer: string;
  }>({
    answer: '',
  });
  const { onDropDownChange, sort: selectedSchoolName } =
    useDropDown<string>('');

  const selectedId = useMemo(
    () => schools.filter((school) => school.name === selectedSchoolName)[0]?.id,
    [selectedSchoolName, schools],
  );

  const { data: question } = useQuery(
    [queryKeys.학교확인질문확인, selectedId, nextStep],
    () => selectedId !== undefined && nextStep && getSchoolQuestion(selectedId),
  );

  const onClickShowQNA = () => {
    setNextStep(true);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onClickAnswer = () => {
    findId(selectedId, answerState.answer)
      .then((res) => {
        toastDispatch({
          actionType: 'APPEND_TOAST',
          toastType: 'SUCCESS',
          message: `${res.email}으로 아이디가 발송되었습니다.`,
        });
        navigate('/login');
      })
      .catch(() => {
        toastDispatch({
          actionType: 'APPEND_TOAST',
          toastType: 'ERROR',
          message: '학교 인증 질문과 답변이 일치하지 않습니다.',
        });
      });
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
        <_QNA nextStep={nextStep}>
          <Question question={question?.question} />
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
