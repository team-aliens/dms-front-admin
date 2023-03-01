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
import { StudyRoomList } from './pages/apply/StudyRoomList';
import { CreateRoom } from '@/pages/apply/CreateRoom';
import { StudyRoomDetail } from '@/pages/apply/Detail';
import { PatchRoom } from './pages/apply/PatchRoom';

export const pathToKorean = {
  'notice': {
    index: '공지 목록',
    write: {
      index: '공지 작성하기',
    },
    detail: {
      index: '공지 상세보기',
      patch: {
        dynamic: '공지 수정하기',
      },
    },
  },
  'apply': {
    index: '신청',
    create: '자습실 생성',
    detail: {
      index: '자습실 상세보기',
      patch: {
        dynamic: '자습실 수정하기',
      },
    },
  },
  'my-page': {
    'index': '마이페이지',
    'change-pwd': '비밀번호 변경',
  },
};

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
          <Route path="detail/patch/:noticeId" element={<PatchNoticePage />} />
          <Route path="detail/:noticeId" element={<NoticeDetail />} />
        </Route>
        <Route path="/apply">
          <Route index element={<StudyRoomList />} />
          <Route path="create" element={<CreateRoom />} />
          <Route path="detail/:id" element={<StudyRoomDetail />} />
          <Route path="detail/patch/:id" element={<PatchRoom />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
