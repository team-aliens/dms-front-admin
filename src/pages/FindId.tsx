import { useMemo, useState } from 'react';
import { FindAccountId } from '@/components/auth/findAccount/FindAccountId';
import { AuthTemplate } from '@/components/auth/AuthTemplate';
import { useForm } from '@/hooks/useForm';
import { useDropDown } from '@/hooks/useDropDown';
import {
  useSchoolListQuery,
  useSchoolQuestionQuery,
} from '@/hooks/useSchoolApis';
import { useFindId } from '@/hooks/useMangersApis';

export function FindIdPage() {
  const [isNextStep, setIsNextStep] = useState<boolean>(false);
  const { data: schoolList } = useSchoolListQuery();
  const { onHandleChange, state: answerState } = useForm<{
    answer: string;
  }>({
    answer: '',
  });

  const { onDropDownChange, sort: selectedSchoolName } =
    useDropDown<string>('');

  const selectedId = useMemo(
    () => schoolList?.schools?.filter(
      (school) => school.name === selectedSchoolName,
    )[0]?.id,
    [selectedSchoolName, schoolList],
  );

  const { data: question } = useSchoolQuestionQuery({ selectedId, isNextStep });

  const onClickShowQNA = () => {
    setIsNextStep(true);
  };
  const postAnswer = useFindId({
    selectedId,
    answer: answerState.answer,
  });
  return (
    <AuthTemplate>
      {schoolList && (
        <FindAccountId
          schools={schoolList.schools}
          answer={answerState.answer}
          question={question?.question}
          onChange={onHandleChange}
          onClick={() => (isNextStep ? postAnswer.mutate() : onClickShowQNA())}
          onDropDownChange={onDropDownChange}
          selectedSchoolName={selectedSchoolName}
          isNextStep={isNextStep}
        />
      )}
    </AuthTemplate>
  );
}
