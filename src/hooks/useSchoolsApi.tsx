import { useMutation } from 'react-query';
import { changeSchoolQnA, reIssueSchoolCode } from '@/apis/schools';
import { ChangeSchoolQnARequest } from '@/apis/schools/request';

export const useReissueSchoolCode = () => useMutation(reIssueSchoolCode);

export const useChangeQnA = (content: ChangeSchoolQnARequest) => useMutation(() => changeSchoolQnA(content));
