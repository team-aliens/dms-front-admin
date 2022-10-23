import { Text } from 'aliens-design-system-front';
import styled from 'styled-components';

interface SelectedProps {
  onClick: () => void;
  selected: boolean;
}

export function StudentBox({ selected, onClick }: SelectedProps) {
  return (
    <_Wrapper selected={selected} onClick={onClick}>
      <img src="" alt="" />
      <_StudentName selected={selected} fontSize="l" color="gray9">
        가나다
      </_StudentName>
      <_StudentNumber selected={selected} fontSize="l" color="gray6">
        1234
      </_StudentNumber>
      <_StudentRoomNumber selected={selected} fontSize="l" color="gray6">
        123호
      </_StudentRoomNumber>
    </_Wrapper>
  );
}

const _Wrapper = styled.div<{ selected: boolean }>`
  width: 530px;
  height: 70px;
  background-color: ${({ selected, theme }) => (selected ? theme.color.primaryDarken2 : theme.color.gray1)};
  padding: 17px 40px 17px 36px;
  margin-top: 16px;
  display: flex;
  align-items: center;
  box-shadow: 0px 1px 20px rgba(204, 204, 204, 0.24);
  border-radius: 4px;
  cursor: pointer;

  > img {
    width: 36px;
    height: 36px;
    border-radius: 100%;
    margin-right: 16px;
  }
`;

const _StudentName = styled(Text)<{ selected: boolean }>`
  margin-right: 12px;
  color: ${({ selected, theme }) => (selected ? theme.color.gray1 : theme.color.gray9)};
`;

const _StudentNumber = styled(Text)<{ selected: boolean }>`
  color: ${({ selected, theme }) => (selected ? theme.color.gray4 : theme.color.gray6)};
  margin-right: 250px;
`;

const _StudentRoomNumber = styled(Text)<{ selected: boolean }>`
  color: ${({ selected, theme }) => (selected ? theme.color.gray4 : theme.color.gray6)};
`;
