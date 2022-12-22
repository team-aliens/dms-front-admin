import { useContext } from 'react';
import {
  toastDispatchContext,
  toastStateContext,
} from '@team-aliens/design-system';

export const useToast = () => {
  const toastState = useContext(toastStateContext);
  const toastDispatch = useContext(toastDispatchContext);
  return {
    toastState,
    toastDispatch,
  };
};
