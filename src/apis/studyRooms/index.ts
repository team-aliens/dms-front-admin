import { pagePath } from '@/utils/pagePath';
import { MutationOptions, useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { instance } from '../axios';
import { AxiosError } from 'axios';
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
  StudyRoomErrorMessage,
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

interface CustomError extends Error {
  response?: {
    data: {
      field_error?: StudyRoomErrorMessage;
      status?: number;
    };
    status: number;
    headers: string;
  };
}

export const useCreateStudyRoom = (
  body: CreateStudyRoomRequest,
) => {
  const navigate = useNavigate();
  const { toastDispatch } = useToast();
  return useMutation(
    async () => instance.post<CreateStudyRoomResponse>(router, body),
    {
      onSuccess: () => {
        toastDispatch({
          toastType: 'SUCCESS',
          actionType: 'APPEND_TOAST',
          message: '자습실이 생성되었습니다.',
        });
        navigate(`${pagePath.apply.studyRoom.list}`);
      },
      onError: (error: unknown) => {
        const customErr = error as CustomError;
        console.log(customErr.response.data.field_error);

        if (customErr.response.data) {
          switch (customErr.response.status) {
            case 400: {
              toastDispatch({
                toastType: 'ERROR',
                actionType: 'APPEND_TOAST',
                message: '값이 잘못되었습니다.',
              });
              break;
            }
            case 401: {
              toastDispatch({
                toastType: 'ERROR',
                actionType: 'APPEND_TOAST',
                message: '계정오류',
              });
              break;
            }
            case 403: {
              toastDispatch({
                toastType: 'ERROR',
                actionType: 'APPEND_TOAST',
                message: '권한이 없습니다.',
              });
              break;
            }
            case 409: {
              toastDispatch({
                toastType: 'ERROR',
                actionType: 'APPEND_TOAST',
                message: '자습실이 이미 존재합니다',
              });
              break;
            }
            case 429: {
              toastDispatch({
                toastType: 'ERROR',
                actionType: 'APPEND_TOAST',
                message: '너무 많이 요청되었습니다.',
              });
              break;
            }
            default: {
              toastDispatch({
                toastType: 'ERROR',
                actionType: 'APPEND_TOAST',
                message: `ERROR CODE : ${customErr.response.status}`,
              });
            }
          }
          
        }
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
  const { closeModal } = useModal();
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
        closeModal();
      },
      onError: (error: AxiosError) => {
        if (error.request.status) {
          switch (error.request.status) {
            case 400: {
              toastDispatch({
                toastType: 'ERROR',
                actionType: 'APPEND_TOAST',
                message: '값이 잘못되었습니다.',
              });
              break;
            }
            case 401: {
              toastDispatch({
                toastType: 'ERROR',
                actionType: 'APPEND_TOAST',
                message: '계정오류',
              });
              break;
            }
            case 403: {
              toastDispatch({
                toastType: 'ERROR',
                actionType: 'APPEND_TOAST',
                message: '권한이 없습니다.',
              });
              break;
            }
            case 409: {
              toastDispatch({
                toastType: 'ERROR',
                actionType: 'APPEND_TOAST',
                message: '자습실이 이미 존재합니다',
              });
              break;
            }
            case 429: {
              toastDispatch({
                toastType: 'ERROR',
                actionType: 'APPEND_TOAST',
                message: '너무 많이 요청되었습니다.',
              });
              break;
            }
            default: {
              toastDispatch({
                toastType: 'ERROR',
                actionType: 'APPEND_TOAST',
                message: `ERROR CODE : ${error.request.status}`,
              });
            }
          }
        }
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

export const useSeatTypeList = (study_room_id?: string) =>
  useQuery(['seatType'], async () => {
    const { data } = await instance.get<SeatTypeResponse>(
      `${router}/types${
        study_room_id ? `?study_room_id=${study_room_id}` : ''
      }`,
    );
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
) => {
  const { toastDispatch } = useToast();
  return useMutation(
    () =>
      instance.post<CreateStudyTimeSlotsResponse>(
        `${router}/time-slots`,
        body.body,
      ),
    {
      ...options,
      onError: (error: AxiosError) => {
        if (error.request.status) {
          switch (error.request.status) {
            case 400: {
              toastDispatch({
                toastType: 'ERROR',
                actionType: 'APPEND_TOAST',
                message: '값이 잘못되었습니다.',
              });
            }
            case 401: {
              toastDispatch({
                toastType: 'ERROR',
                actionType: 'APPEND_TOAST',
                message: '계정오류',
              });
            }
            case 403: {
              toastDispatch({
                toastType: 'ERROR',
                actionType: 'APPEND_TOAST',
                message: '권한이 없습니다.',
              });
            }
            case 409: {
              toastDispatch({
                toastType: 'ERROR',
                actionType: 'APPEND_TOAST',
                message: '이미 존재합니다.',
              });
            }
          }
        }
      },
    },
  );
};

export const useEditTimeSlots = ({ path, body }: EditStudyTimeSlotsRequest) => {
  const { toastDispatch } = useToast();
  return useMutation(
    () => instance.patch(`${router}/time-slots/${path.time_slot_id}`, body),
    {
      onError: (error: AxiosError) => {
        if (error.request.status) {
          switch (error.request.status) {
            case 400: {
              toastDispatch({
                toastType: 'ERROR',
                actionType: 'APPEND_TOAST',
                message: '값이 잘못되었습니다.',
              });
            }
            case 401: {
              toastDispatch({
                toastType: 'ERROR',
                actionType: 'APPEND_TOAST',
                message: '계정오류',
              });
            }
            case 403: {
              toastDispatch({
                toastType: 'ERROR',
                actionType: 'APPEND_TOAST',
                message: '권한이 없습니다.',
              });
            }
            case 409: {
              toastDispatch({
                toastType: 'ERROR',
                actionType: 'APPEND_TOAST',
                message: '이미 존재합니다.',
              });
            }
          }
        }
      },
    },
  );
};

export const useDeleteTimeSlots = ({ path }: DeleteStudyTimeSlotsRequest) =>
  useMutation(() =>
    instance.delete(`${router}/time-slots/${path.time_slot_id}`),
  );

export const useGetStudyExcel = () =>
  useMutation(
    () =>
      instance.post(`${router}/students/file`, null, {
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

export const useAddStudyFile = (body: File) =>
  useMutation(
    () => {
      const fd = new FormData();
      fd.append('file', body);
      return instance.post(`${router}/students/file`, fd, {
        responseType: 'blob',
      });
    },
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

export const useGetStudyExcelSample = () =>
  useMutation(async () => {
    const a = document.createElement('a');
    a.href =
      'https://image-dms.s3.ap-northeast-2.amazonaws.com/DMS_%E1%84%8E%E1%85%AE%E1%84%80%E1%85%A1%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%87%E1%85%A9%E1%84%8B%E1%85%A6%E1%86%A8%E1%84%89%E1%85%A6%E1%86%AF_%E1%84%8B%E1%85%A8%E1%84%89%E1%85%B5.xlsx';
    a.click();
  });
