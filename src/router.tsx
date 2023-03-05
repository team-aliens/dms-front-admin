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
import { StudyRoomList } from './pages/apply/study/StudyRoomList';
import { CreateRoom } from '@/pages/apply/study/CreateRoom';
import { StudyRoomDetail } from '@/pages/apply/study/Detail';
import { PatchRoom } from './pages/apply/study/PatchRoom';
import Index from '@/pages/apply';
import RemainsLists from '@/pages/apply/remains';
import { pagePath } from './utils/pagePath';
import { NotFoundPage } from './pages/NotFound';

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
        <Route path={pagePath.home} element={<Home />} />
        <Route path={pagePath.login} element={<LoginPage />} />
        <Route path={pagePath.findAccountId} element={<FindIdPage />} />
        <Route path={pagePath.resetPassword} element={<ResetPwdPage />} />
        <Route path={pagePath.myPage.main}>
          <Route index element={<MyPage />} />
          <Route path="change-pwd" element={<ChangePwd />} />
        </Route>
        <Route path={pagePath.notice.list}>
          <Route index element={<NoticeListPage />} />
          <Route path="write" element={<WriteNoticePage />} />
          <Route path="detail/patch/:noticeId" element={<PatchNoticePage />} />
          <Route path="detail/:noticeId" element={<NoticeDetail />} />
        </Route>
        <Route path={pagePath.apply.main}>
          <Route index element={<Index />} />
          <Route path="study">
            <Route index element={<StudyRoomList />} />
            <Route path="create" element={<CreateRoom />} />
            <Route path="detail/:id" element={<StudyRoomDetail />} />
            <Route path="detail/patch/:id" element={<PatchRoom />} />
          </Route>
          <Route path="remains">
            <Route index element={<RemainsLists />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
