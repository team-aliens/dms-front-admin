import { instance } from '..';
import {
  ReIssueSchoolCodeResponse,
  SchoolListResponse,
  SchoolQuestionResponse,
} from './response';
import { ChangeSchoolQnARequest } from '@/apis/schools/request';
import { IsUseAbleFeature } from '../auth/response';

const router = '/schools';

export const getSchoolList = async () => {
  const { data } = await instance.get<Promise<SchoolListResponse>>(router);
  return data;
};

/** 학교 확인 질문 */
export const getSchoolQuestion = async (schoolId: string) => {
  const { data } = await instance.get<Promise<SchoolQuestionResponse>>(
    `${router}/question/${schoolId}`,
  );
  return data;
};

/** 학교 확인 질문 답변 */
export const answerSchoolQuestion = async (
  schoolId: string,
  answer: string,
) => {
  await instance.get(`${router}/answer/${schoolId}?answer=${answer}`);
};

export const reIssueSchoolCode = async () => {
  const { data } = await instance.patch<ReIssueSchoolCodeResponse>(
    `${router}/code`,
  );
  return data;
};

export const changeSchoolQnA = async (body: ChangeSchoolQnARequest) => {
  await instance.patch(`${router}/question`, body);
};

/* 사용가능 기능 조회 */
export const availAbleFeatures = async () => {
  const { data } = await instance.get<IsUseAbleFeature>(
    `${router}/available-features`,
  );

  return data;
};
