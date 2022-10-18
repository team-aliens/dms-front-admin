import { useContext } from 'react';
import {
  toastDispatchContext,
  toastStateContext,
} from 'aliens-design-system-front';

export const useToast = () => {
  // 이거 왜 에러나요...? 근데 사용은 된답니다~
  const toastState = useContext(toastStateContext);
  const toastDispatch = useContext(toastDispatchContext);
  return {
    toastState,
    toastDispatch,
  };
};
