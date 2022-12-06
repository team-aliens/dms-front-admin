export interface NoticeDetailResponse {
  title: string;
  content: string;
  created_at: Date;
}

export interface NoticeCardItem {
  id: string;
  title: string;
  create_at: Date;
}

export interface NoticeListResponse {
  notices: NoticeCardItem[];
}

export interface WriteNoticeResponse {
  notice_id: string;
}
