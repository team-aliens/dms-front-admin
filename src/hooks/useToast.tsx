import { useContext } from 'react';
import {
  toastDispatchContext,
  toastStateContext,
} from 'aliens-design-system-front';

export const useToast = () => {
  const toastState = useContext(toastStateContext);
  const toastDispatch = useContext(toastDispatchContext);
  return {
    toastState,
    toastDispatch,
  };
};
