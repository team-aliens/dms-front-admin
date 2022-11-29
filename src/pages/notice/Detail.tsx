import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Title, Text } from 'aliens-design-system-front';
import { useEffect, useState } from 'react';
import { NoticeDetailSummary } from '@/components/notice/NoticeDetailSummary';
import { WithNavigatorBar } from '@/components/WithNavigatorBar';
import { NoticeDetailResponse } from '@/apis/notice/response';
import { getNoticeDetail } from '@/apis/notice';

export function NoticeDetail() {
  const [detail, setDetail] = useState<NoticeDetailResponse>({
    title: '',
    content: '',
    create_at: new Date(),
  });
  const { noticeId } = useParams();
  useEffect(() => {
    getNoticeDetail(noticeId)
      .then((res) => setDetail(res))
      .catch();
  }, [noticeId]);
  return (
    <WithNavigatorBar>
      <_Wrapper>
        <_Path />
        <_Title fontSize="l" color="gray9" display="inline-block">
          {detail.title}
        </_Title>
        <NoticeDetailSummary
          createdDate={detail.create_at}
          noticeId={noticeId}
        />
        <_Content color="gray7" fontSize="m" display="inline-block">
          {detail.content}
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

const _Title = styled(Title)`
  margin-top: 52px;
`;

const _Content = styled(Text)`
  margin-top: 40px;
`;
