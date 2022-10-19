import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { LoginPage } from './pages/loginPage';
import { CertificationPage } from './pages/resetPasswordPage/CertificationPage';
import { ResetPage } from './pages/resetPasswordPage/ResetPage';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset">
          <Route path="/" element={<CertificationPage />} />
          <Route path=":password" element={<ResetPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
