import { GradeType, SeatStatusType, SexType } from '@/apis/studyRooms/request';
import { Features } from '@/apis/auth/response';

export const dateToString = (date: Date) => {
  const newDate = new Date(date);
  return `${newDate.getFullYear()}/${newDate.getMonth()}/${newDate.getDay()}`;
};

export type SexToKorean = '남여 모두' | '남' | '여';

export const sexTypeToKorean = (sex: SexType): SexToKorean => {
  switch (sex) {
    case 'ALL':
      return '남여 모두';
    case 'MALE':
      return '남';
    case 'FEMALE':
      return '여';
    default:
  }
};

export const sexKoreanToEng = (sex: SexToKorean): SexType => {
  switch (sex) {
    case '남여 모두':
      return 'ALL';
    case '남':
      return 'MALE';
    case '여':
      return 'FEMALE';
    default:
  }
};

export type GradeToKorean = '모든 학년' | '1학년' | '2학년' | '3학년';

export const gradeTypeToKorean = (grade: GradeType): GradeToKorean => {
  switch (grade) {
    case 0:
      return '모든 학년';
    case 1:
      return '1학년';
    case 2:
      return '2학년';
    case 3:
      return '3학년';
    default:
  }
};

export const gradeKoreanToEng = (grade: GradeToKorean): GradeType => {
  switch (grade) {
    case '모든 학년':
      return 0;
    case '1학년':
      return 1;
    case '2학년':
      return 2;
    case '3학년':
      return 3;
    default:
  }
};

export type SeatStatusKorean = '사용 가능' | '사용 불가';

export const seatStatusToKorean = (
  status: SeatStatusType,
): SeatStatusKorean => {
  switch (status) {
    case 'AVAILABLE':
      return '사용 가능';
    case 'UNAVAILABLE':
      return '사용 불가';
    default:
  }
};

export const seatStatusKoreanToEng = (
  status: SeatStatusKorean,
): SeatStatusType => {
  switch (status) {
    case '사용 가능':
      return 'AVAILABLE';
    case '사용 불가':
      return 'UNAVAILABLE';
    default:
  }
};

export type ServiceToKorean = '홈' | '신청' | '공지' | '마이페이지';

export interface ServiceObject {
  service: ServiceToKorean | '';
  index: number;
}

export const serviceToKorean = (service: Features): ServiceObject => {
  switch (service) {
    case 'apply_service':
      return { service: '신청', index: 1 };
    case 'point_service':
      return { service: '홈', index: 0 };
    case 'notice_service':
      return { service: '공지', index: 2 };
    case 'meal_service':
    default:
      return {
        service: '',
        index: -99,
      };
  }
};
