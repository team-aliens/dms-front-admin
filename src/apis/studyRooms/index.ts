import { useMutation, useQuery } from 'react-query';
import { instance } from '../axios';
import {
  ApplicationTimeResponse,
  SeatTypeResponse,
  StudyRoomDetailResponse,
  StudyRoomListResponse,
} from '@/apis/studyRooms/response';
import {
  CreateStudyRoomRequest,
  CreatSeatTypeRequest,
  SetApplicationTimeRequest,
} from '@/apis/studyRooms/request';

const router = '/study_rooms';

export const useGetApplicationTime = () => useQuery(['getStudentRoomApplicationTime'], async () => {
  await instance.get<ApplicationTimeResponse>(`${router}/available-time`);
});

export const useCreateStudyRoom = (body: CreateStudyRoomRequest) => useMutation(async () => instance.post(router, body));

export const useSetApplicationTime = (body: SetApplicationTimeRequest) => useMutation(
  async () => instance.put(`${router}/available-time`, body),
);

export const useDeleteStudyRoom = (studyRoomId: string) => useMutation(
  async () => instance.delete(`${router}/${studyRoomId}`),
);

export const useStudyRoomDetail = (studyRoomId: string) => useQuery(
  ['studyRoomDetail', studyRoomId],
  async () => instance.get<StudyRoomDetailResponse>(
    `${router}/${studyRoomId}/managers`,
  ),
);

export const usePatchStudyRoom = (
  studyRoomId: string,
  body: CreateStudyRoomRequest,
) => useMutation(
  async () => instance.patch(`${router}/${studyRoomId}`, body),
);

export const useStudyRoomList = () => useQuery(
  ['studyRoomList'],
  async () => instance.get<StudyRoomListResponse>(`${router}/list/managers`),
);

export const useSeatType = () => useQuery(
  ['seatType'],
  async () => instance.get<SeatTypeResponse>(`${router}/types`),
);

export const useCreateSeatType = (body: CreatSeatTypeRequest) => useMutation(async () => instance.post(`${router}/types`, body));
