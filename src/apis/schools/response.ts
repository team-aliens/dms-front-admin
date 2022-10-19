interface SchoolInformation {
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
