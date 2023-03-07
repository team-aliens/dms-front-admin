import { AxiosResponse } from 'axios';
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

export const studentAccountIssuance = async (file: FileList[0]) => {
  const reqeustFile = new FormData();
  reqeustFile.append('file', file);
  const { data } = await instance.post<AxiosResponse>(
    `${router}/verified-student`,
    reqeustFile,
  );
  return data;
};
