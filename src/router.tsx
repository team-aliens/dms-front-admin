import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { LoginPage } from './pages/loginPage';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}
