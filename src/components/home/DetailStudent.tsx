import styled from 'styled-components';
import { Title, Text, Button } from 'aliens-design-system-front';

export function DetailStudent() {
  const onClickStudent = () => {};

  return (
    <div>
      <_DetailStudentTitleContainer>
        <_DetailStudentTitle fontSize="s" color="gray6">
          학생 상세 확인
        </_DetailStudentTitle>
      </_DetailStudentTitleContainer>
      <_DetailBox>
        <_StudentInfoWrapper>
          <div className="img">a</div>
          <_StudentBasicInfo>
            <_StudentNameNumWrapper>
              <_StudentName fontSize="m" color="gray9">
                가나다
              </_StudentName>
              <Title fontSize="m" color="gray6">
                1234
              </Title>
            </_StudentNameNumWrapper>
            <_StudentRoomWrapper>
              <_StudentRoomNumber fontSize="l" color="gray6">
                201호
              </_StudentRoomNumber>
            </_StudentRoomWrapper>
          </_StudentBasicInfo>
        </_StudentInfoWrapper>
        <_RewardPointWrapper>
          <_RewardPoint>
            <Text fontSize="s" color="gray6">
              상점
            </Text>
            <hr />
            <_RewardNum fontSize="l" color="gray9">
              4
            </_RewardNum>
          </_RewardPoint>
          <_RewardPoint>
            <Text fontSize="s" color="gray6">
              벌점
            </Text>
            <hr />
            <_RewardNum fontSize="l" color="gray9">
              4
            </_RewardNum>
          </_RewardPoint>
        </_RewardPointWrapper>
        <_SameRoomStudentWrapper>
          <Text fontSize="s" color="gray6">
            동일 호실 학생
          </Text>
          <_SameRoomStudentContainer>
            <_SameRoomStudent
              size="default"
              disabled={false}
              color="gray"
              onClick={onClickStudent}
              type="outline"
            >
              가나다
            </_SameRoomStudent>
            <_SameRoomStudent
              size="default"
              disabled={false}
              color="gray"
              onClick={onClickStudent}
              type="outline"
            >
              가나다
            </_SameRoomStudent>
            <_SameRoomStudent
              size="default"
              disabled={false}
              color="gray"
              onClick={onClickStudent}
              type="outline"
            >
              가나다
            </_SameRoomStudent>
            <_SameRoomStudent
              size="default"
              disabled={false}
              color="gray"
              onClick={onClickStudent}
              type="outline"
            >
              가나다
            </_SameRoomStudent>
            <_SameRoomStudent
              size="default"
              disabled={false}
              color="gray"
              onClick={onClickStudent}
              type="outline"
            >
              가나다
            </_SameRoomStudent>
            <_SameRoomStudent
              size="default"
              disabled={false}
              color="gray"
              onClick={onClickStudent}
              type="outline"
            >
              가나다
            </_SameRoomStudent>

            <_SameRoomStudent
              size="default"
              disabled={false}
              color="gray"
              onClick={onClickStudent}
              type="outline"
            >
              가나다
            </_SameRoomStudent>
          </_SameRoomStudentContainer>
        </_SameRoomStudentWrapper>
      </_DetailBox>
    </div>
  );
}

const _DetailStudentTitleContainer = styled.div`
  margin-bottom: 43px;
`;

const _DetailStudentTitle = styled(Title)``;

const _DetailBox = styled.div`
  width: 476px;
  height: 525px;
  padding: 60px;
  box-shadow: 0px 1px 20px rgba(204, 204, 204, 0.24);
  border-radius: 4px;

  .img {
    width: 120px;
    height: 120px;
    margin-right: 24px;
    border-radius: 100%;
    background-color: ${({ theme }) => theme.color.gray6};
  }
`;

const _StudentInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  > div {
    display: flex;
    align-items: center;
  }
`;

const _StudentNameNumWrapper = styled.div``;

const _StudentRoomWrapper = styled.div`
  display: flex;
`;

const _StudentBasicInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const _StudentName = styled(Title)`
  margin-right: 20px;
`;

const _StudentRoomNumber = styled(Text)`
  margin: 20px 83px 0 0;
`;

const _RewardPointWrapper = styled.div`
  width: 354px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
`;

const _RewardNum = styled(Text)`
  margin-top: 3px;
`;

const _RewardPoint = styled.div`
  width: 172px;
  height: 47px;
  padding: 11px 44px 12px 22px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.color.gray3};
  background-color: ${({ theme }) => theme.color.gray2};
  display: flex;
  align-items: center;

  > hr {
    width: 1px;
    height: 31px;
    margin-left: 24px;
    margin-right: 43px;
    background-color: ${({ theme }) => theme.color.gray3};
  }
`;

const _SameRoomStudentWrapper = styled.div`
  margin-top: 60px;
`;

const _SameRoomStudentContainer = styled.div`
  margin-top: 8px;
  width: 370px;
  display: flex;
  flex-wrap: wrap;
`;

const _SameRoomStudent = styled(Button)`
  margin: 0 12px 12px 0;
`;
