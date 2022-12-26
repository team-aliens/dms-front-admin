import {
  GradeType,
  SeatStatusType,
  SexType,
  StudyRoom,
} from '@/apis/studyRooms/request';

export type SeatStatus = 'IN_USE' | SeatStatusType;

export interface ApplicationTimeResponse {
  start_at: string;
  end_at: string;
}

export interface CreateStudyRoomResponse {
  study_room_id: string;
}

export interface SeatType {
  id: string;
  name: string;
  color: string;
}

interface SeatPreview {
  id: string;
  width_location: number;
  height_location: number;
  number: number | null;
  type: SeatType | null;
  status: SeatStatus;
  student: {
    id: string;
    gcn: string;
    name: string;
    profile_image_url: string;
  } | null;
}

export interface StudyRoomDetailResponse extends StudyRoom {
  total_available_seat: number;
  available_sex: SexType;
  available_grade: GradeType;
  seats: SeatPreview[];
}

export interface StudyRoomItem {
  id: string;
  floor: number;
  name: string;
  available_grade: GradeType;
  available_sex: SexType;
  in_use_headcount: number;
  total_available_seat: number;
}

export interface StudyRoomListResponse {
  study_rooms: StudyRoomItem[];
}

export interface SeatTypeResponse {
  types: SeatType[];
}
