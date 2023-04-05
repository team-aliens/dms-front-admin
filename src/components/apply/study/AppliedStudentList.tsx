import styled from 'styled-components';
import { Text } from '@team-aliens/design-system';
import { SeatPreview } from '@/apis/studyRooms/response';

const columnName = ['프로필 사진', '번호', '자리 종류', '학번 & 이름'];

interface PropsType {
  studentList: SeatPreview[];
}

export function AppliedStudentList({ studentList }: PropsType) {
  return (
    <_Wrapper>
      <Text size="titleS" color="primary">
        사용중인 학생
      </Text>
      <_ColumnNames>
        {columnName.map((name) => (
          <_ColumnName color="gray4" size="captionM">
            {name}
          </_ColumnName>
        ))}
      </_ColumnNames>
      <_Divider />
      <_StudentList>
        {studentList.map((item) => (
          <_Row color={item.type?.color}>
            <img
              src={
                item.student?.profile_image_url ||
                'https://image-dms.s3.ap-northeast-2.amazonaws.com/59fd0067-93ef-4bcb-8722-5bc8786c5156%7C%7C%E1%84%83%E1%85%A1%E1%84%8B%E1%85%AE%E1%86%AB%E1%84%85%E1%85%A9%E1%84%83%E1%85%B3.png'
              }
              alt="프로필"
              width={60}
              height={60}
            />
            <Text size="captionM" color="gray10">
              {item.number}번
            </Text>
            <Text size="captionM" color="gray10" className="typeName">
              {item.type?.name}
            </Text>
            <Text size="captionM" color="gray10">
              {item.student?.gcn}<br/>{item.student?.name}
            </Text>
          </_Row>
        ))}
      </_StudentList>
    </_Wrapper>
  );
}

const _Wrapper = styled.div`
  width: 360px;
  height: 600px;
  border: 3px solid ${({ theme }) => theme.color.primary};
  border-radius: 10px;
  overflow: scroll;
  padding: 20px;
`;

const _ColumnNames = styled.div`
  display: flex;
  width: 100%;
  margin-top: 22px;
  justify-content: space-evenly;
`;

const _ColumnName = styled(Text)`
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const _Divider = styled.hr`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.color.gray4};
  margin-top: 10px;
`;

const _StudentList = styled.ul`
  width: 100%;
`;

const _Row = styled.li<{
  color: string;
}>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 12px;
  > div {
    width: 60px;
    text-align: center;
  }
  > img {
    border-radius: 50%;
  }
  > .typeName {
    color: ${({ color }) => color};
  }
`;
