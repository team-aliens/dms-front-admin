import styled from 'styled-components';
import { Text, Title } from 'aliens-design-system-front';

export const NoticeItem = () => {
  return (
    <_Wrapper>
      <Title fontSize="xs">제목이 들어가요</Title>
      <_Date fontSize="m" color="gray5">
        2022/10/31
      </_Date>
    </_Wrapper>
  );
};

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
