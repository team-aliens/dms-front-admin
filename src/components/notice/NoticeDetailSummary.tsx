import { Text, Button } from '@team-aliens/design-system';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { dateToString } from '@/utils/translate';
import { pagePath } from '@/utils/pagePath';

interface Props {
  noticeId: string;
  createdDate: string;
  onClickDeleteNotice: () => void;
}

export function NoticeDetailSummary({
  noticeId,
  createdDate,
  onClickDeleteNotice,
}: Props) {
  return (
    <_Wrapper>
      <Text size="bodyM" color="gray5" display="inline-block">
        {dateToString(createdDate)}
      </Text>
      <Link to={pagePath.notice.patch(noticeId)}>
        <Button kind="outline" onClick={() => {}} color="primary">
          수정하기
        </Button>
      </Link>
      <Button kind="outline" onClick={onClickDeleteNotice} color="error">
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
