import { pagePath } from '@/utils/pagePath';
import { MutationOptions, useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { instance } from '../axios';
import {
  ApplicationTimeResponse,
  CreateStudyRoomResponse,
  CreateStudyTimeSlotsResponse,
  SeatTypeResponse,
  StudyRoomDetailResponse,
  StudyRoomListResponse,
  StudyTimeSlotsResponse,
} from '@/apis/studyRooms/response';
import {
  CreateStudyRoomRequest,
  CreateStudyTimeSlotsRequest,
  CreatSeatTypeRequest,
  DeleteStudyTimeSlotsRequest,
  EditStudyTimeSlotsRequest,
  SetApplicationTimeRequest,
  StudyRoomListRequest,
} from '@/apis/studyRooms/request';
import { useToast } from '@/hooks/useToast';
import { useModal } from '@/hooks/useModal';
import fileSaver from 'file-saver';
import { getFileNameFromContentDisposition } from '@/utils/decoder';

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
  const { toastDispatch } = useToast();
  return useMutation(
    async () => instance.post<CreateStudyRoomResponse>(router, body),
    {
      onSuccess: (response) => {
        toastDispatch({
          toastType: 'SUCCESS',
          actionType: 'APPEND_TOAST',
          message: '자습실이 생성되었습니다.',
        });
        navigate(`${pagePath.apply.studyRoom.list}`);
      },
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
      navigate(`${pagePath.apply.studyRoom.list}`);
      toastDispatch({
        toastType: 'SUCCESS',
        actionType: 'APPEND_TOAST',
        message: '자습실이 삭제되었습니다.',
      });
    },
  });
};

export const useStudyRoomDetail = (studyRoomId: string, timeSlotId: string) =>
  useQuery(['studyRoomDetail', studyRoomId], async () => {
    const { data } = await instance.get<StudyRoomDetailResponse>(
      `${router}/${studyRoomId}/managers`,
      {
        params: {
          time_slot: timeSlotId,
        },
      },
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
        toastDispatch({
          toastType: 'SUCCESS',
          actionType: 'APPEND_TOAST',
          message: '자습실이 수정되었습니다.',
        });
        navigate(`${pagePath.apply.studyRoom.list}`);
      },
    },
  );
};

export const useStudyRoomList = ({ time_slot }: StudyRoomListRequest) =>
  useMutation(['studyRoomList'], async () => {
    const { data } = await instance.get<StudyRoomListResponse>(
      `${router}/list/managers?time_slot=${time_slot}`,
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

export const useStudyTimeSlots = () =>
  useMutation(['useStudyTimeSlots'], async () => {
    const { data } = await instance.get<StudyTimeSlotsResponse>(
      `${router}/time-slots`,
    );
    return data;
  });

export const useCreateTimeSlots = (
  body: CreateStudyTimeSlotsRequest,
  options?: MutationOptions,
) =>
  useMutation(
    () =>
      instance.post<CreateStudyTimeSlotsResponse>(
        `${router}/time-slots`,
        body.body,
      ),
    {
      ...options,
    },
  );

export const useEditTimeSlots = ({ path, body }: EditStudyTimeSlotsRequest) =>
  useMutation(() =>
    instance.patch(`${router}/time-slots/${path.time_slot_id}`, body),
  );

export const useDeleteTimeSlots = ({ path }: DeleteStudyTimeSlotsRequest) =>
  useMutation(() =>
    instance.delete(`${router}/time-slots/${path.time_slot_id}`),
  );

export const useGetStudyExcel = () =>
  useMutation(
    () =>
      instance.post(`${router}/students/file`, {
        responseType: 'blob',
      }),
    {
      onSuccess: (res) => {
        const blob = new Blob([res.data], {
          type: res.headers['content-type'],
        });
        const fileName = res.headers['content-disposition'];
        fileSaver.saveAs(blob, getFileNameFromContentDisposition(fileName));
      },
    },
  );

export const useAddStudyFile = (body: any) =>
  useMutation(() => instance.post(`${router}/students/file`, body));

export const useGetStudyExcelSample = () =>
  useMutation(async () => {
    const a = document.createElement('a');
    a.href =
      'https://file.notion.so/f/s/5f6c4d89-bce7-49bf-b107-2e6ef52105fa/DMS_%E1%84%8E%E1%85%AE%E1%84%80%E1%85%A1%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%87%E1%85%A9%E1%84%8B%E1%85%A6%E1%86%A8%E1%84%89%E1%85%A6%E1%86%AF_%E1%84%8B%E1%85%A8%E1%84%89%E1%85%B5.xlsx?id=ba651a7d-3f56-4b1f-9afa-978500a8e5b7&table=block&spaceId=06958058-af42-4393-8b43-0071a0d4a86f&expirationTimestamp=1680162572191&signature=F-eLjS5zFMayXDMLQaObwQcSWyiINd6S8q5EQOiYu50&downloadName=DMS_%E1%84%8E%E1%85%AE%E1%84%80%E1%85%A1%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%87%E1%85%A9%E1%84%8B%E1%85%A6%E1%86%A8%E1%84%89%E1%85%A6%E1%86%AF_%E1%84%8B%E1%85%A8%E1%84%89%E1%85%B5.xlsx';
    a.click();
  });
