import { instance } from '../axios';
import { TagListResponse } from './response';
const router = '/tags';

export const tagList = async () => {
  const { data } = await instance.get<TagListResponse>(`${router}`);
  return data;
};

export const deleteTag = async (student_id: string, tag_id: string) => {
  await instance.delete(
    `${router}/students?student_id=${student_id}&tag_id=${tag_id}`,
  );
};
