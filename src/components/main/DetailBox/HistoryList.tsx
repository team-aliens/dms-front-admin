import styled from 'styled-components';
import { Text } from '@team-aliens/design-system';
import { StudentDetailPointList } from './StudentDetailPoint';
import { PointHistoryList } from '@/context/pointHistoryList';

interface PropsType {
  pointHistoryList: PointHistoryList[];
  studentId: string[];
}

export function HistoryList({ pointHistoryList, studentId }: PropsType) {
  return (
    <>
      <_Message margin={['top', 12]} color="gray5" size="bodyL">
        학생 전체 상/벌점 내역은 학생 상세 확인해주세요.
      </_Message>
      <_PointDetailBox>
        {pointHistoryList
          .filter((i) => studentId.includes(i.studentId))
          .map(({ name, gcn, studentId, list }) => (
            <StudentDetailPointList
              key={studentId}
              name={name}
              gcn={gcn}
              historyList={list}
            />
          ))}
      </_PointDetailBox>
    </>
  );
}

const _PointDetailBox = styled.div`
  position: relative;
  width: 309px;
  min-height: 485px;
`;

const _Message = styled(Text)`
  width: 191px;
`;
