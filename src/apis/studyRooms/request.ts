import { MutationOptions } from 'react-query';

export type SeatStatusType = 'AVAILABLE' | 'UNAVAILABLE' | 'EMPTY' | 'IN_USE';
export type SexType = 'MALE' | 'FEMALE' | 'ALL';
export type GradeType = 0 | 1 | 2 | 3;

export interface Seat {
  width_location: number;
  height_location: number;
  number: number | null;
  type_id: string;
  status: SeatStatusType;
}
interface Slots {
  id: string;
  end_time: string;
  start_time: string;
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
  time_slot_ids: string[];
  time_slots: Slots[];
}

export interface StudyRoomErrorMessage {
  floor: string;
  name: string;
  eastDescription: string;
  westDescription: string;
  southDescription: string;
  northDescription: string;
}

export interface CreateStudyRoomRequest extends StudyRoom {
  seats: Seat[];
}

export interface StudyRoomListRequest {
  time_slot: string;
}

export interface SetApplicationTimeRequest {
  start_at: string;
  end_at: string;
}
export interface CreatSeatTypeRequest {
  name: string;
  color: string;
}

export interface CreateStudyTimeSlotsRequest {
  body: {
    start_time: string;
    end_time: string;
  };
}

export interface EditStudyTimeSlotsRequest extends MutationOptions {
  path: {
    time_slot_id: string;
  };
  body: {
    start_time: string;
    end_time: string;
  };
}

export interface DeleteStudyTimeSlotsRequest {
  path: {
    time_slot_id: string;
  };
}
