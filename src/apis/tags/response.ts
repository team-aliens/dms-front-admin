export interface TagType {
  id: string;
  name: string;
  color: string;
}

export interface TagListResponse {
  tags: TagType[];
}
