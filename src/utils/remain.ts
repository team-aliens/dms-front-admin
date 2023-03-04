import { DAY } from '@/apis/remains';

export const getDayWithText = (text: string) => {
  switch (text) {
    case '월':
      return DAY.MONDAY;
    case '화':
      return DAY.TUESDAY;
    case '수':
      return DAY.WEDNESDAY;
    case '목':
      return DAY.THURSDAY;
    case '금':
      return DAY.FRIDAY;
    case '토':
      return DAY.SATURDAY;
    case '일':
      return DAY.SUNDAY;
    default:
  }
};

export const getTextWithDay = (day: DAY) => {
  switch (day) {
    case DAY.MONDAY:
      return '월';
    case DAY.TUESDAY:
      return '화';
    case DAY.WEDNESDAY:
      return '수';
    case DAY.THURSDAY:
      return '목';
    case DAY.FRIDAY:
      return '금';
    case DAY.SATURDAY:
      return '토';
    case DAY.SUNDAY:
      return '일';
    default:
  }
};
