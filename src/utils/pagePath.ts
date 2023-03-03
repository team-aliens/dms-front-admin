interface PagePath {
  home: '/';
  login: '/login';
  findAccountId: '/find-account-id';
  resetPassword: '/reset';
  myPage: {
    main: '/my-page';
    changePwd: '/my-page/change-pwd';
  };
  apply: {
    main: '/apply';
    remains: {
      list: '/apply/remains';
    };
    studyRoom: {
      list: '/apply/study';
      create: '/apply/study/create';
      deatail: (
        studyRoomId: number | string,
      ) => `/apply/study/detail/${typeof studyRoomId}`;
      patch: (
        studyRoomId: number | string,
      ) => `/apply/study/detail/patch/${typeof studyRoomId}`;
    };
  };
  notice: {
    list: '/notice';
    write: '/notice/write';
    detail: (noticeId: number | string) => `/notice/detail/${typeof noticeId}`;
    patch: (
      noticeId: number | string,
    ) => `/notice/detail/patch/${typeof noticeId}`;
  };
}

export const pagePath: PagePath = {
  home: '/',
  login: '/login',
  findAccountId: '/find-account-id',
  resetPassword: '/reset',
  myPage: {
    main: '/my-page',
    changePwd: '/my-page/change-pwd',
  },
  notice: {
    list: '/notice',
    write: '/notice/write',
    detail: (noticeId: number | string) => `/notice/detail/${noticeId}`,
    patch: (noticeId: number | string) => `/notice/detail/patch/${noticeId}`,
  },
  apply: {
    main: '/apply',
    remains: {
      list: '/apply/remains',
    },
    studyRoom: {
      list: '/apply/study',
      create: '/apply/study/create',
      deatail: (studyRoomId: number | string) =>
        `/apply/study/detail/${studyRoomId}`,
      patch: (studyRoomId: number | string) =>
        `/apply/study/detail/patch/${studyRoomId}`,
    },
  },
} as const;
