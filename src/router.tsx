import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { LoginPage } from '@/pages/LoginPage';
import { FindAccountIdPage } from './pages/findAccountId';
import { Main } from '@/pages/Main';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { NoticeListPage } from '@/pages/notice/List';
import { NoticeDetail } from '@/pages/notice/Detail';
import { WriteNotice } from '@/pages/notice/Write';
import { MyPage } from './pages/myPage';
import { ChangePwd } from './pages/myPage/ChangePwd';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/find-account-id" element={<FindAccountIdPage />} />
        <Route path="/reset" element={<ResetPasswordPage />} />
        <Route path="/my-page">
          <Route index element={<MyPage />} />
          <Route path="change-pwd" element={<ChangePwd />} />
        </Route>
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
