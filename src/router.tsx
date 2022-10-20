import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/homePage';
import { LoginPage } from './pages/loginPage';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
