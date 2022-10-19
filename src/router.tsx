import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { LoginPage } from './pages/loginPage';
import { FindIdPage } from './pages/findIdPage';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/find-id" element={<FindIdPage />} />
      </Routes>
    </BrowserRouter>
  );
}
