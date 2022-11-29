import { Button } from 'aliens-design-system-front';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { WithNavigatorBar } from '@/components/WithNavigatorBar';
import { NoticeCardItem } from '@/apis/notice/response';
import { getNoticeList, NoticeSortEnum, NoticeSortType } from '@/apis/notice';
import { NoticeItem } from '@/components/notice/NoticeItem';

const date = new Date();

const dummyData: NoticeCardItem[] = [
  {
    id: '1',
    title: '제목입니다',
    create_at: date,
  },
  {
    id: '2',
    title: '제목입니다',
    create_at: date,
  },
  {
    id: '3',
    title: '제목입니다',
    create_at: date,
  },
  {
    id: '4',
    title: '제목입니다',
    create_at: date,
  },
  {
    id: '5',
    title: '제목입니다',
    create_at: date,
  },
];

export function NoticeListPage() {
  const [noticeList, setNoticeList] = useState<NoticeCardItem[]>(dummyData);
  const [sortType, setSortType] = useState<NoticeSortType>('NEW');

  useEffect(() => {
    getNoticeList(sortType).then((res) => {
      setNoticeList(res.notices);
    });
  }, [sortType]);

  return (
    <WithNavigatorBar>
      <_Wrapper>
        <_FilterSection>
          <Button
            type="outline"
            color="gray"
            onClick={() => setSortType(sortType === 'NEW' ? 'OLD' : 'NEW')}
          >
            {NoticeSortEnum[sortType]}순
          </Button>
          <Link to="/notice/write">
            <Button type="outline" color="primary">
              공지 작성하기
            </Button>
          </Link>
        </_FilterSection>
        <_List>
          {noticeList.map((item) => (
            <Link to={`/notice/detail/${item.id}`}>
              <NoticeItem noticeItem={item} key={item.id} />
            </Link>
          ))}
        </_List>
      </_Wrapper>
    </WithNavigatorBar>
  );
}

const _Wrapper = styled.div`
  margin: 0 auto;
  width: 1030px;
`;

const _FilterSection = styled.section`
  margin-top: 160px;
  display: flex;
  > a {
    margin-left: auto;
  }
`;

const _List = styled.ul`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px 0;
`;
