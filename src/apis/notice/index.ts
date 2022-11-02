import { WriteNoticeRequest } from '@/apis/notice/request';
import { instance } from '@/apis/axios';
import {
  NoticeDetailResponse,
  NoticeListResponse,
} from '@/apis/notice/response';

const router = '/notices';

export const writeNotice = async (body: WriteNoticeRequest) => {
  await instance.post(`${router}`, body);
};

export const patchNotice = async (
  body: WriteNoticeRequest,
  noticeId: number,
) => {
  await instance.patch(`${router}/${noticeId}`, body);
};

export const deleteNotice = async (noticeId: number) => {
  await instance.delete(`${router}/${noticeId}`);
};

export const getNoticeDetail = async (noticeId: number) => {
  const { data } = await instance.get<Promise<NoticeDetailResponse>>(
    `${router}/${noticeId}`,
  );
  return data;
};

export type NoticeSortType = 'NEW' | 'OLD';

export const getNoticeList = async (order: NoticeSortType) => {
  const { data } = await instance.get<Promise<NoticeListResponse>>(
    `${router}?order=${order}`,
  );
};
