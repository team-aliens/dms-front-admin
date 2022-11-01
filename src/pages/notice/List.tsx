import { Button } from 'aliens-design-system-front';
import { WithNavigatorBar } from '@/components/WithNavigatorBar';
import { NoticeList } from '@/components/notice/NoticeList';
import styled from 'styled-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type SortType = '최신' | '오래된';

export const NoticeListPage = () => {
  const [sortType, setSortType] = useState<SortType>('최신');
  const onClickChangeSort = () => {
    if (sortType === '최신') setSortType('오래된');
    else setSortType('최신');
  };
  return (
    <WithNavigatorBar>
      <_Wrapper>
        <_FilterSection>
          <Button type="outline" color="gray" onClick={onClickChangeSort}>
            {sortType}순
          </Button>
          <Link to="/write-notice">
            <Button type="outline" color="primary" onClick={() => {}}>
              공지 작성하기
            </Button>
          </Link>
        </_FilterSection>
        <NoticeList />
      </_Wrapper>
    </WithNavigatorBar>
  );
};

const _Wrapper = styled.div`
  margin: 0 auto;
`;

const _FilterSection = styled.section`
  margin-top: 160px;
  display: flex;
  > a {
    margin-left: auto;
  }
`;
