import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { LoginPage } from '@/pages/LoginPage';
import { FindAccountIdPage } from './pages/findAccountId';
import { Main } from '@/pages/Main';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { NoticeListPage } from '@/pages/notice/List';
import { NoticeDetail } from '@/pages/notice/Detail';
import { WriteNotice } from '@/pages/notice/Write';

// navigator bar는 path로 상태를 구분합니다.
// 공지사항이 선택된 상태를 원한다면 /notice를 기준으로 중첩 라우팅을 하여 구현해야 합니다.

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
          <Route path="write" element={<WriteNotice />} />
          <Route path="detail/:noticeId" element={<NoticeDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
