import { RecoilRoot } from 'recoil';
import { ToastContainer, ToastProvider } from '@team-aliens/design-system';
import { Router } from './router';
import { useModal } from './hooks/useModal';
import { useEffect } from 'react';

export function App() {
  const { modalState } = useModal();
  useEffect(() => {
    if (modalState.selectedModal) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'auto';
      };
    }
  }, [modalState.selectedModal]);

  return (
    <RecoilRoot>
      <ToastProvider>
        <ToastContainer />
        <Router />
      </ToastProvider>
    </RecoilRoot>
  );
}
