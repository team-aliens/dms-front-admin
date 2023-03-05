import { PointType } from '@/apis/points';

export interface AllPointListResponse {
  point_histories: AllPointItemType[];
}

export interface AllPointItemType {
  point_history_id?: string;
  student_name: string;
  student_gcn: string;
  date?: string;
  point_name: string;
  point_type: PointType;
  point_score: number;
}

export interface StudentPointHistoryResponse {
  point_histories: StudentPointHistoryType[];
}

export interface StudentPointHistoryType {
  point_history_id: string;
  type: PointType;
  score: number;
  name: string;
}

export interface AllPointsOptionResponse {
  point_options: AllPointsOptionType[];
}

export interface AllPointsOptionType {
  point_option_id: string;
  type: PointType;
  score: number;
  name: string;
}