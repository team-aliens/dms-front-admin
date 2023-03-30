import { TagType } from '../tags/response';

export interface FindAccountIdResponse {
  email: string;
}

export interface StudentInfo {
  id: string;
  name: string;
  gcn: string;
  room_number: string;
  profile_image_url: string;
  tags: TagType[];
}

export interface SearchStudentListResponse {
  students: StudentInfo[];
}

interface RoomMatesInfo {
  id: string;
  name: string;
  profile_image_url: string;
}

export type GenderType = 'FEMALE' | 'MALE';

export interface GetStudentDetailResponse {
  name: string;
  gcn: string;
  room_number: string;
  profile_image_url: string;
  bonus_point: number;
  minus_point: number;
  room_mates: RoomMatesInfo[];
  sex: GenderType;
  tags: TagType[];
}

export interface GetMyProfileResponse {
  school_id: string;
  school_name: string;
  code: string;
  question: string;
  answer: string;
}
