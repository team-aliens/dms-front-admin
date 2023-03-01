import { MutationOptions, useMutation, useQuery } from 'react-query';
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
import { useToast } from '@/hooks/useToast';
import { useModal } from '@/hooks/useModal';

const router = '/study-rooms';

export const useGetApplicationTime = () =>
  useQuery(['getStudentRoomApplicationTime'], async () => {
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
      onSuccess: (response) =>
        navigate(`/apply/detail/${response.data.study_room_id}`),
    },
  );
};

export const useSetApplicationTime = (
  body: SetApplicationTimeRequest,
  options?: MutationOptions,
) =>
  useMutation(async () => instance.put(`${router}/available-time`, body), {
    ...options,
  });

export const useDeleteStudyRoom = (
  studyRoomId: string,
  options?: MutationOptions,
) => {
  const navigate = useNavigate();
  const { toastDispatch } = useToast();
  const { closeModal } = useModal();
  return useMutation(async () => instance.delete(`${router}/${studyRoomId}`), {
    onSuccess: () => {
      closeModal();
      navigate('/apply');
      toastDispatch({
        toastType: 'SUCCESS',
        actionType: 'APPEND_TOAST',
        message: '자습실이 삭제되었습니다.',
      });
    },
  });
};

export const useStudyRoomDetail = (studyRoomId: string) =>
  useQuery(['studyRoomDetail', studyRoomId], async () => {
    const { data } = await instance.get<StudyRoomDetailResponse>(
      `${router}/${studyRoomId}/managers`,
    );
    return data;
  });

export const usePatchStudyRoom = (
  studyRoomId: string,
  body: CreateStudyRoomRequest,
) => {
  const navigate = useNavigate();
  const { toastDispatch } = useToast();
  return useMutation(
    async () => instance.patch(`${router}/${studyRoomId}`, body),
    {
      onSuccess: () => {
        navigate(`/apply/detail/${studyRoomId}`);
        toastDispatch({
          toastType: 'SUCCESS',
          actionType: 'APPEND_TOAST',
          message: '자습실이 수정되었습니다.',
        });
      },
    },
  );
};

export const useStudyRoomList = () =>
  useQuery(['studyRoomList'], async () => {
    const { data } = await instance.get<StudyRoomListResponse>(
      `${router}/list/managers`,
    );
    return data;
  });

export const useSeatTypeList = () =>
  useQuery(['seatType'], async () => {
    const { data } = await instance.get<SeatTypeResponse>(`${router}/types`);
    return data;
  });

export const useCreateSeatType = (
  body: CreatSeatTypeRequest,
  options?: MutationOptions,
) =>
  useMutation(async () => instance.post(`${router}/types`, body), {
    ...options,
  });

export const useDeleteSeatType = (id: string, options?: MutationOptions) =>
  useMutation(async () => instance.delete(`${router}/types/${id}`), {
    ...options,
  });
