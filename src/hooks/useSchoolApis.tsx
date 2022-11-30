import { useQuery } from 'react-query';
import { queryKeys } from '@/utils/queryKeys';
import { getSchoolList, getSchoolQuestion } from '@/apis/schools';

interface PropsType {
  selectedId: string;
  isNextStep: boolean;
}

export const useSchoolQuestionQuery = ({ selectedId, isNextStep }: PropsType) => useQuery(
  [queryKeys.학교확인질문확인, selectedId, isNextStep],
  () => selectedId !== undefined && isNextStep && getSchoolQuestion(selectedId),
);

export const useSchoolListQuery = () => useQuery([queryKeys.학교리스트조회], getSchoolList);
