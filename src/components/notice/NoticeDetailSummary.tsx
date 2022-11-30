import { Text, Button } from 'aliens-design-system-front';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { deleteNotice } from '@/apis/notice';

interface Props {
  noticeId: string;
  createdDate: Date;
}

export function NoticeDetailSummary({ noticeId, createdDate }: Props) {
  const onClickDeleteNotice = () => {
    deleteNotice(noticeId).then(() => {});
  };
  return (
    <_Wrapper>
      <Text size="bodyM" color="gray5" display="inline-block">
        {createdDate?.toLocaleDateString()}
      </Text>
      <Link to={`/notice/write/${noticeId}`}>
        <Button type="outline" onClick={() => {}} color="primary">
          수정하기
        </Button>
      </Link>
      <Button type="outline" onClick={onClickDeleteNotice} color="error">
        삭제하기
      </Button>
    </_Wrapper>
  );
}

const _Wrapper = styled.div`
  display: flex;
  margin-top: 40px;
  align-items: center;
  padding-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray3};

  > a {
    margin-left: auto;
  }
  button {
    margin-left: 10px;
  }
`;
