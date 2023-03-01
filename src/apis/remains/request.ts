import { DAY } from '@/apis/remains/index';

export interface putRemainTimeBody {
  start_day_of_week: DAY;
  start_time: string;
  end_day_of_week: DAY;
  end_time: string;
}

export interface createRemainBody {
  title: string;
  description: string;
}

export interface EditRemainBody {
  title: string;
  description: string;
}
