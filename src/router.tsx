import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { LoginPage } from './pages/loginPage';
import { FindAccountIdPage } from './pages/findAccountId';
import { Main } from '@/pages/main';
import { ResetPasswordPage } from './pages/ResetPasswordPage';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/find-account-id" element={<FindAccountIdPage />} />
        <Route path="/reset" element={<ResetPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}
