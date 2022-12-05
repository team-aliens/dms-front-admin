import { useMutation, useQuery } from 'react-query';
import {
  changeSchoolQnA,
  getSchoolList,
  getSchoolQuestion,
  reIssueSchoolCode,
} from '@/apis/schools';
import { ChangeSchoolQnARequest } from '@/apis/schools/request';
import { queryKeys } from '@/utils/queryKeys';

export const useReissueSchoolCode = () => useMutation(reIssueSchoolCode);

export const useChangeQnA = (content: ChangeSchoolQnARequest) => useMutation(() => changeSchoolQnA(content));

interface PropsType {
  selectedId: string;
  isNextStep: boolean;
}

export const useSchoolQuestionQuery = ({ selectedId, isNextStep }: PropsType) => useQuery(
  [queryKeys.학교확인질문확인, selectedId, isNextStep],
  () => selectedId !== undefined && isNextStep && getSchoolQuestion(selectedId),
);

export const useSchoolListQuery = () => useQuery([queryKeys.학교리스트조회], getSchoolList);
