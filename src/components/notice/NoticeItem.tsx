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
      <Text size="bodyM" color="gray5" margin={['left', 'auto']}>
        {noticeItem?.create_at?.toDateString()}
      </Text>
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
