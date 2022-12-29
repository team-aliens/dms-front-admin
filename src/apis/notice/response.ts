export interface NoticeDetailResponse {
  title: string;
  content: string;
  created_at: string;
}

export interface NoticeCardItem {
  id: string;
  title: string;
  created_at: string;
}

export interface NoticeListResponse {
  notices: NoticeCardItem[];
}

export interface WriteNoticeResponse {
  notice_id: string;
}
