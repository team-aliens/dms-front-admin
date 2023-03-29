export interface AllTagListPropsType {
  tag_id: string;
  tag_name: string;
  tag_color: string;
  OptionSelected : string;
  onClick?: (tagId: string, tagName: string, tagColor: string) => void;
}

export interface AllTagListResponse {
    tags: AllTagListType[];
  }
  
  export interface AllTagListType {
    id: string;
    name: string;
    color: string;
  }