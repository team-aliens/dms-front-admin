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
      <_PointDetailBox isSelected={studentId.length > 0}>
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

const _PointDetailBox = styled.div<{ isSelected: boolean }>`
  position: relative;
  width: 309px;
  min-height: 485px;
  border-top: ${({ theme, isSelected }) =>
    isSelected && `1px solid ${theme.color.gray5}`};
  margin-top: 20px;
`;
