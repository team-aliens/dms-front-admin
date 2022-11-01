import { Text, Button } from 'aliens-design-system-front';
import styled from 'styled-components';

export const NoticeDetailSummary = () => {
  return (
    <_Wrapper>
      <Text fontSize="m" color="gray5" display="inline-block">
        2022/10/31
      </Text>
      <Button type="outline" onClick={() => {}} color="primary">
        수정하기
      </Button>
      <Button type="outline" onClick={() => {}} color="error">
        삭제하기
      </Button>
    </_Wrapper>
  );
};

const _Wrapper = styled.div`
  display: flex;
  margin-top: 40px;
  align-items: center;
  padding-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray3};

  > button {
    margin-left: auto;
    :last-of-type {
      margin-left: 10px;
    }
  }
`;
