import { instance } from '../axios';
import { SchoolQuestionResponse } from './response';

const router = '/schools';

// 학교 확인 질문
export const getSchoolQuestion = async (schoolId: string) => {
  const { data } = await instance.get<Promise<SchoolQuestionResponse>>(
    `${router}/question/${schoolId}`,
  );
  return data;
};

// 학교 확인 질문 답변
export const answerSchoolQuestion = async (
  schoolId: string,
  answer: string,
) => {
  await instance.get(`${router}/answer/${schoolId}?answer=${answer}`);
};
