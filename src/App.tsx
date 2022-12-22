import { RecoilRoot } from 'recoil';
import { ToastContainer, ToastProvider } from '@team-aliens/design-system';
import { Router } from './router';

export function App() {
  return (
    <RecoilRoot>
      <ToastProvider>
        <ToastContainer />
        <Router />
      </ToastProvider>
    </RecoilRoot>
  );
}
