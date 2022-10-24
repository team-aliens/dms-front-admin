export interface FindAccountIdResponse {
  email: string;
}

export interface StudentInfo {
  id: string;
  name: string;
  gcn: string;
  room_number: number;
  profile_image_url: string;
}

export interface SearchStudentListResponse {
  students: StudentInfo[];
}

interface RoomMatesInfo {
  id: string;
  name: string;
  profile_image_url: string;
}

export interface GetStudentDetailResponse {
  name: string;
  gcn: string;
  room_number: number;
  profile_image_url: string;
  bonus_point: number;
  minus_point: number;
  room_mates: RoomMatesInfo[];
}
