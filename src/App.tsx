import { RecoilRoot } from 'recoil';
import { ToastContainer, ToastProvider } from 'aliens-design-system-front';
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
