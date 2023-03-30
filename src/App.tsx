import { RecoilRoot } from 'recoil';
import { ToastContainer, ToastProvider } from '@team-aliens/design-system';
import { Router } from './router';
import { useModal } from './hooks/useModal';
import { useEffect } from 'react';
import { getCookie } from './utils/cookies';
import { pagePath } from './utils/pagePath';
import { Outlet, RouterProvider } from 'react-router-dom';
import { PointListProvider } from './context/pointHistoryList';
import { GlobalStyle } from './style/globalStyle';

export function App() {
  const { modalState } = useModal();
  const accessToken = getCookie('access_token');
  const refreshToken = getCookie('refresh_token');
  if (!accessToken && !refreshToken && window.location.pathname !== '/login') {
    window.location.href = pagePath.login;
  }
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
        <PointListProvider>
          <ToastContainer />
          <Outlet />
          <GlobalStyle />
          <RouterProvider router={Router} />
        </PointListProvider>
      </ToastProvider>
    </RecoilRoot>
  );
}
