import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { LoginPage } from './pages/auth/LoginPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';
import { Main } from '@/pages/main';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset" element={<ResetPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}
