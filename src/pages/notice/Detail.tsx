import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Text } from 'aliens-design-system-front';
import { useQuery } from 'react-query';
import { NoticeDetailSummary } from '@/components/notice/NoticeDetailSummary';
import { WithNavigatorBar } from '@/components/WithNavigatorBar';
import { getNoticeDetail } from '@/apis/notice';
import { queryKeys } from '@/utils/queryKeys';

export function NoticeDetail() {
  const { noticeId } = useParams();
  const { data: detail } = useQuery(
    [queryKeys.공지사항상세보기, noticeId],
    () => getNoticeDetail(noticeId),
  );
  return (
    <WithNavigatorBar>
      <_Wrapper>
        <_Path />
        <_Title size="titleM" color="gray10" display="inline-block">
          {detail?.title}
        </_Title>
        <NoticeDetailSummary
          createdDate={detail?.create_at}
          noticeId={noticeId}
        />
        <_Content color="gray7" size="bodyM" display="inline-block">
          {detail?.content}
        </_Content>
      </_Wrapper>
    </WithNavigatorBar>
  );
}

const _Wrapper = styled.div`
  width: 1030px;
  margin: 0 auto;
`;

const _Path = styled.div`
  height: 22px;
  width: 180px;
  background-color: ${({ theme }) => theme.color.gray5};
  margin-top: 86px;
`;

const _Title = styled(Text)`
  margin-top: 52px;
`;

const _Content = styled(Text)`
  margin-top: 40px;
`;
