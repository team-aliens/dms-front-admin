import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { LoginPage } from './pages/loginPage';
import { FindAccountIdPage } from './pages/findAccountId';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/find-account-id" element={<FindAccountIdPage />} />
      </Routes>
    </BrowserRouter>
  );
}
