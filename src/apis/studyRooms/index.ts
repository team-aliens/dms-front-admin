import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { instance } from '../axios';
import {
  ApplicationTimeResponse,
  CreateStudyRoomResponse,
  SeatTypeResponse,
  StudyRoomDetailResponse,
  StudyRoomListResponse,
} from '@/apis/studyRooms/response';
import {
  CreateStudyRoomRequest,
  CreatSeatTypeRequest,
  SetApplicationTimeRequest,
} from '@/apis/studyRooms/request';

const router = '/study-rooms';

export const useGetApplicationTime = () => useQuery(['getStudentRoomApplicationTime'], async () => {
  const { data } = await instance.get<ApplicationTimeResponse>(
    `${router}/available-time`,
  );
  return data;
});

export const useCreateStudyRoom = (body: CreateStudyRoomRequest) => {
  const navigate = useNavigate();
  return useMutation(
    async () => instance.post<CreateStudyRoomResponse>(router, body),
    {
      onSuccess: (response) => navigate(`/apply/detail/${response.data.study_room_id}`),
    },
  );
};

export const useSetApplicationTime = (body: SetApplicationTimeRequest) => useMutation(async () => instance.put(`${router}/available-time`, body));

export const useDeleteStudyRoom = (studyRoomId: string) => useMutation(async () => instance.delete(`${router}/${studyRoomId}`));

export const useStudyRoomDetail = (studyRoomId: string) => useQuery(['studyRoomDetail', studyRoomId], async () => {
  const { data } = await instance.get<StudyRoomDetailResponse>(
    `${router}/${studyRoomId}/managers`,
  );
  return data;
});

export const usePatchStudyRoom = (
  studyRoomId: string,
  body: CreateStudyRoomRequest,
) => useMutation(async () => instance.patch(`${router}/${studyRoomId}`, body));

export const useStudyRoomList = () => useQuery(['studyRoomList'], async () => {
  const { data } = await instance.get<StudyRoomListResponse>(
    `${router}/list/managers`,
  );
  return data;
});

export const useSeatType = () => useQuery(['seatType'], async () => {
  const { data } = await instance.get<SeatTypeResponse>(`${router}/types`);
  return data;
});

export const useCreateSeatType = (body: CreatSeatTypeRequest) => useMutation(async () => instance.post(`${router}/types`, body));
