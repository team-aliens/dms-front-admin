import { useParams } from 'react-router-dom';
import { WithNavigatorBar } from '@/components/WithNavigatorBar';
import styled from 'styled-components';
import { Title, Text } from 'aliens-design-system-front';
import { NoticeDetailSummary } from '@/components/notice/NoticeDetailSummary';

export const NoticeDetail = () => {
  // const { noticeId } = useParams();
  return (
    <WithNavigatorBar>
      <_Wrapper>
        <_Path />
        <_Title fontSize="l" color="gray9" display="inline-block">
          공지 제목이 나옵니다 공지 제목이 나옵니다
        </_Title>
        <NoticeDetailSummary />
        <_Content color="gray7" fontSize="m" display="inline-block">
          공지 내용이 나옵니다 공지 내용이 나옵니다 공지 내용이 나옵니다 공지
          내용이 나옵니다 공지 내용이 나옵니다 공지 내용이 나옵니다 공지 내용이
          나옵니다 공지 내용이 나옵니다 공지 내용이 나옵니다 공지 내용이
          나옵니다 공지 내용이 나옵니다 공지 내용이 나옵니다 공지 내용이
          나옵니다 공지 내용이 나옵니다 공지 내용이 나옵니다
        </_Content>
      </_Wrapper>
    </WithNavigatorBar>
  );
};

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
