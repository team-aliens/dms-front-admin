import { instance } from '../axios';
import { FileUploadResponse } from '@/apis/files/response';

const router = '/files';

export const uploadFile = async (file: FormData) => {
  const { data } = await instance.post<Promise<FileUploadResponse>>(
    router,
    file,
  );
  return data;
};
