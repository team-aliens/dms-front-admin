import { AxiosResponse } from 'axios';
import { instance } from '../axios';
import { SchoolQuestionResponse } from './response';

const router = '/schools';

export const getSchoolQuestion = async (schoolId: string) => {
  const { data }: AxiosResponse<Promise<SchoolQuestionResponse>> =
    await instance.get(`${router}/question/${schoolId}`);
  return data;
};

export const answerSchoolQuestion = async (
  schoolId: string,
  answer: string,
) => {
  await instance.get(`${router}/answer/${schoolId}?answer=${answer}`);
};
