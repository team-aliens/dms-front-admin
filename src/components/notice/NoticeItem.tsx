import styled from 'styled-components';
import { Text } from '@team-aliens/design-system';
import { NoticeCardItem } from '@/apis/notice/response';

interface Props {
  noticeItem: NoticeCardItem;
}

export function NoticeItem({ noticeItem }: Props) {
  return (
    <_Wrapper>
      <Text size="bodyL">{noticeItem?.title}</Text>
      <_Date size="bodyM" color="gray5">
        {noticeItem?.create_at?.toDateString()}
      </_Date>
    </_Wrapper>
  );
}

const _Wrapper = styled.li`
  width: 100%;
  height: 60px;
  background-color: ${({ theme }) => theme.color.gray1};
  box-shadow: 0 1px 20px rgba(204, 204, 204, 0.24);
  border-radius: 4px;
  padding: 16px 40px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const _Date = styled(Text)`
  margin-left: auto;
`;
