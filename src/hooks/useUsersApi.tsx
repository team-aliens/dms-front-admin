import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { changePwd, checkPwd } from '@/apis/users';
import { ChangePasswordRequest } from '@/apis/users/request';
import { useToast } from '@/hooks/useToast';

export const useCheckPwd = (password: string) =>
  useQuery(['checkPwd', password], () => checkPwd(password), {
    refetchOnWindowFocus: false,
    enabled: false,
    retry: false,
  });

export const useChangePwd = (body: ChangePasswordRequest) => {
  const { toastDispatch } = useToast();
  const navigate = useNavigate();

  return useMutation(() => changePwd(body), {
    onSuccess: () => {
      navigate('/my-page');
      toastDispatch({
        actionType: 'APPEND_TOAST',
        toastType: 'SUCCESS',
        message: '비밀번호가 변경되었습니다.',
      });
    },
  });
};
