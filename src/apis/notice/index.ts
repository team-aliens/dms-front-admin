import { WriteNoticeRequest } from '@/apis/notice/request';
import { instance } from '@/apis';
import {
  NoticeDetailResponse,
  NoticeListResponse,
  WriteNoticeResponse,
} from '@/apis/notice/response';

const router = '/notices';

export const writeNotice = async (body: WriteNoticeRequest) =>
  instance.post<WriteNoticeResponse>(`${router}`, body);

export const patchNotice = async (body: WriteNoticeRequest, noticeId: string) =>
  instance.patch<WriteNoticeResponse>(`${router}/${noticeId}`, body);

export const deleteNotice = async (noticeId: string) => {
  await instance.delete(`${router}/${noticeId}`);
};

export const getNoticeDetail = async (noticeId: string) => {
  const { data } = await instance.get<NoticeDetailResponse>(
    `${router}/${noticeId}`,
  );
  return data;
};

export type NoticeSortType = 'NEW' | 'OLD';

export enum NoticeSortEnum {
  NEW = '최신',
  OLD = '오래된',
}

export const getNoticeList = async (order: NoticeSortType) => {
  const { data } = await instance.get<Promise<NoticeListResponse>>(
    `${router}?order=${order}`,
  );
  return data;
};
