export interface TagType {
  id: string;
  name: string;
  color: string;
}

export interface TagListResponse {
  tags: TagType[];
}

export interface AllTagListPropsType {
  tag_id: string;
  tag_name: string;
  tag_color: string;
  OptionSelected : string;
  onClick?: (tagId: string, tagName: string, tagColor: string) => void;
}
