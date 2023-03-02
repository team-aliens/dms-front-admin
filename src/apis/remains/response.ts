import { DAY } from '@/apis/remains/index';

export interface getRemainTimeResponse {
  start_day_of_week: DAY;
  start_time: string;
  end_day_of_week: DAY;
  end_time: string;
}

export interface getAllRemainTimeResponse {
  remain_options: {
    id: string;
    title: string;
    description: string;
    is_applied: boolean;
  }[];
}

export interface createRemainResponse {
  remain_option_id: string;
}
