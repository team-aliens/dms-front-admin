import { Features } from '../auth/response';

export interface SchoolInformation {
  id: string;
  name: string;
  address: string;
}

export interface SchoolListResponse {
  schools: SchoolInformation[];
}

export interface SchoolQuestionResponse {
  question: string;
}

export interface ReIssueSchoolCodeResponse {
  code: string;
}
