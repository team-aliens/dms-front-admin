import { MutationOptions, useMutation } from 'react-query';
import { instance } from '..';
import { TagListResponse } from './response';
const router = '/tags';

export const deleteTag = async (student_id: string, tag_id: string) => {
  await instance.delete(
    `${router}/students?student_id=${student_id}&tag_id=${tag_id}`,
  );
};

/** 태그 전체 조회 */
export const getAllTags = async () => {
  const { data } = await instance.get<Promise<TagListResponse>>(`${router}`);
  return data;
};

/** 태그 부여 */
export const useGiveTag = (
  selectedTagId: string,
  selectedStudentId: string[],
  options?: MutationOptions,
) => {
  const body = {
    tag_id: selectedTagId,
    student_ids: selectedStudentId,
  };
  return useMutation(async () => instance.post(`${router}/students`, body), {
    ...options,
  });
};

export const useAddTag = (
  name: string,
  color: string,
  options?: MutationOptions,
) => {
  const body = {
    name,
    color,
  };

  return useMutation(async () => instance.post(`${router}`, body), {
    ...options,
  });
};

export const useEditTag = (
  id: string,
  name: string,
  color: string,
  options?: MutationOptions,
) => {
  const body = {
    name,
    color,
  };
  return useMutation(async () => instance.patch(`${router}/${id}`, body), {
    ...options,
  });
};

export const useDeleteTag = (id: string, options?: MutationOptions) => {
  return useMutation(async () => await instance.delete(`${router}/${id}`), {
    ...options,
  });
};
