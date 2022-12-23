export type SeatStatusType = 'AVAILABLE' | 'UNAVAILABLE' | 'EMPTY';
export type SexType = 'MALE' | 'FEMALE' | 'ALL';
export type GradeType = 1 | 2 | 3;

export interface Seat {
  width_location: number;
  height_location: number;
  number: number | null;
  type_id: string | null;
  status: SeatStatusType;
}

export interface StudyRoom {
  floor: number;
  name: string;
  total_width_size: number;
  total_height_size: number;
  east_description: string;
  west_description: string;
  south_description: string;
  north_description: string;
  available_sex: SexType;
  available_grade: GradeType;
}

export interface CreateStudyRoomRequest extends StudyRoom {
  seats: Seat[];
}

export interface SetApplicationTimeRequest {
  start_at: string;
  end_at: string;
}
export interface CreatSeatTypeRequest {
  name: string;
  color: string;
}
