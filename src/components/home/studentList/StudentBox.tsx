import { Text } from 'aliens-design-system-front';
import styled from 'styled-components';

export function StudentBox() {
  return (
    <_Wrapper>
      <img src="" alt="" />
      <_StudentName fontSize="l" color="gray9">
        가나다
      </_StudentName>
      <_StudentNumber fontSize="l" color="gray6">
        1234
      </_StudentNumber>
      <_StudentRoomNumber fontSize="l" color="gray6">
        123호
      </_StudentRoomNumber>
    </_Wrapper>
  );
}

const _Wrapper = styled.div`
  width: 530px;
  height: 70px;
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

const _StudentName = styled(Text)`
  margin-right: 12px;
`;

const _StudentNumber = styled(Text)`
  margin-right: 250px;
`;

const _StudentRoomNumber = styled(Text)``;
