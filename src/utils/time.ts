import { ITimeSlots } from '@/apis/studyRooms/response';

export const tranformTimeSlot = (timeSlot: ITimeSlots) => {
  return {
    start_hour: timeSlot.start_time.slice(0, 2),
    start_min: timeSlot.start_time.slice(3, 5),
    end_hour: timeSlot.end_time.slice(0, 2),
    end_min: timeSlot.end_time.slice(3, 5),
  };
};
