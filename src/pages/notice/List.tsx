import { Button } from '@team-aliens/design-system';
import styled from 'styled-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { WithNavigatorBar } from '@/components/WithNavigatorBar';
import { NoticeSortEnum, NoticeSortType } from '@/apis/notice';
import { NoticeItem } from '@/components/notice/NoticeItem';
import { useNoticeList } from '@/hooks/useNoticeApi';

export function NoticeListPage() {
  const [sortType, setSortType] = useState<NoticeSortType>('NEW');

  const { data: noticeList } = useNoticeList(sortType);

  return (
    <WithNavigatorBar>
      <_Wrapper>
        <_FilterSection>
          <Button
            kind="outline"
            color="gray"
            onClick={() => setSortType(sortType === 'NEW' ? 'OLD' : 'NEW')}
          >
            {NoticeSortEnum[sortType]}
            순
          </Button>
          <Link to="/notice/write">
            <Button kind="outline" color="primary">
              공지 작성하기
            </Button>
          </Link>
        </_FilterSection>
        <_List>
          {noticeList &&
            noticeList.notices.map((item) => (
              <Link to={`/notice/detail/${item.id}`} key={item.id}>
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
