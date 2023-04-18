import {
  Route,
  Routes,
  BrowserRouter,
  createBrowserRouter,
} from 'react-router-dom';
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
import { ComponentType, lazy, LazyExoticComponent, Suspense } from 'react';

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
    study: {
      index: '자습실 목록보기',
      create: '자습실 생성',
      detail: {
        index: '자습실 상세보기',
        patch: {
          dynamic: '자습실 수정하기',
        },
      },
    },
  },
  'my-page': {
    'index': '마이페이지',
    'change-pwd': '비밀번호 변경',
  },
};

// export const Router = createBrowserRouter([
//   {
//     path: '',
//     errorElement: <NotFoundPage />,
//     children: [
//       {
//         path: pagePath.home,
//         element: <Home />,
//       },
//       {
//         path: pagePath.login,
//         element: <LoginPage />,
//       },
//       {
//         path: pagePath.findAccountId,
//         element: <FindIdPage />,
//       },
//       {
//         path: pagePath.resetPassword,
//         element: <ResetPwdPage />,
//       },
//       {
//         path: pagePath.myPage.main,
//         children: [
//           { index: true, element: <MyPage /> },
//           { path: 'change-pwd', element: <ChangePwd /> },
//         ],
//       },
//       {
//         path: pagePath.notice.list,
//         children: [
//           { index: true, element: <NoticeListPage /> },
//           { path: 'write', element: <WriteNoticePage /> },
//           { path: 'detail/patch/:noticeId', element: <PatchNoticePage /> },
//           { path: 'detail/:noticeId', element: <NoticeDetail /> },
//         ],
//       },
//       {
//         path: pagePath.apply.main,
//         children: [
//           { index: true, element: <Index /> },
//           {
//             path: 'study',
//             children: [
//               { index: true, element: <StudyRoomList /> },
//               { path: 'create', element: <CreateRoom /> },
//               { path: 'detail/:id', element: <StudyRoomDetail /> },
//               { path: 'detail/patch/:id', element: <PatchRoom /> },
//             ],
//           },
//           {
//             path: 'remains',
//             children: [{ index: true, element: <RemainsLists /> }],
//           },
//         ],
//       },
//     ],
//   },
// ]);

export const Router = () => {
  //@ts-ignore
  let ErrorPage;
  const contextKeys = require
    .context('./pages', true, /\.tsx$/)
    .keys()
    .filter((key) => {
      if (key.match(/404/g)) {
        ErrorPage = lazy(
          () => import(`./pages/${key.replace('.tsx', '').replace('./', '')}`),
        );
        return false;
      }
      return true;
    });

  return (
    <BrowserRouter>
      <Suspense fallback={<div>로딩 중</div>}>
        <Routes>
          {contextKeys.map((key) => {
            key = key
              .replace('.tsx', '')
              .replace('index', '')
              .replace('./', '');
            const Page = lazy(() => import(`./pages/${key}`));
            return <Route path={key} element={<Page />} />;
          })}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
