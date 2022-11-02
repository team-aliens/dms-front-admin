export interface NoticeDetailResponse {
  title: string;
  content: string;
  create_at: Date;
}

interface NoticeCardItem {
  id: string;
  title: string;
  create_at: Date;
}

export interface NoticeListResponse {
  notices: NoticeCardItem[];
}
