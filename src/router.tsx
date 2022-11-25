import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { LoginPage } from '@/pages/LoginPage';
import { FindIdPage } from './pages/FindId';
import { Home } from '@/pages/Home';
import { ResetPwdPage } from './pages/ResetPwdPage';
import { NoticeListPage } from '@/pages/notice/List';
import { NoticeDetail } from '@/pages/notice/Detail';
import { WriteNotice } from '@/pages/notice/Write';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/find-account-id" element={<FindIdPage />} />
        <Route path="/reset" element={<ResetPwdPage />} />
        <Route path="/notice">
          <Route index element={<NoticeListPage />} />
          <Route path="write" element={<WriteNotice />} />
          <Route
            path="write/:noticeId"
            element={<WriteNotice type="patch" />}
          />
          <Route path="detail/:noticeId" element={<NoticeDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
