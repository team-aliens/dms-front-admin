import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { LoginPage } from '@/pages/LoginPage';
import { FindAccountIdPage } from './pages/findAccountId';
import { Main } from '@/pages/Main';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { NoticeListPage } from '@/pages/notice/List';
import { NoticeDetail } from '@/pages/notice/Detail';
import { WriteNotice } from '@/pages/notice/Write';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/find-account-id" element={<FindAccountIdPage />} />
        <Route path="/reset" element={<ResetPasswordPage />} />
        <Route path="/notice">
          <Route index element={<NoticeListPage />} />
          {/*<Route path=":noticeId" element={<NoticeDetail />} />*/}
          <Route path="write" element={<WriteNotice />} />
          <Route path="detail/:noticeId" element={<NoticeDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
