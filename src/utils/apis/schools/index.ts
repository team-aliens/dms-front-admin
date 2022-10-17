import { AxiosResponse } from 'axios';
import { instance } from '../axios';
import { SchoolQuestionResponse } from './response';

export const getSchoolQuestion = async (schoolId: string) => {
  const { data }: AxiosResponse<Promise<SchoolQuestionResponse>> =
    await instance.get(`/question/${schoolId}`);
  return data;
};

export const answerSchoolQuestion = async (
  schoolId: string,
  answer: string,
) => {
  await instance.get(`/answer/${schoolId}?answer=${answer}`);
};
