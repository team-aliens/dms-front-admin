import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { LoginPage } from '@/pages/LoginPage';
import { FindIdPage } from './pages/FindId';
import { Home } from '@/pages/Home';
import { ResetPwdPage } from './pages/ResetPwdPage';
import { NoticeListPage } from '@/pages/notice/List';
import { NoticeDetail } from '@/pages/notice/Detail';
import { WriteNoticePage } from '@/pages/notice/Write';
import { MyPage } from './pages/myPage';
import { ChangePwd } from './pages/myPage/ChangePwd';
import { PatchNoticePage } from '@/pages/notice/Patch';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/find-account-id" element={<FindIdPage />} />
        <Route path="/reset" element={<ResetPwdPage />} />
        <Route path="/my-page">
          <Route index element={<MyPage />} />
          <Route path="change-pwd" element={<ChangePwd />} />
        </Route>
        <Route path="/notice">
          <Route index element={<NoticeListPage />} />
          <Route path="write" element={<WriteNoticePage />} />
          <Route path="write/:noticeId" element={<PatchNoticePage />} />
          <Route path="detail/:noticeId" element={<NoticeDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
