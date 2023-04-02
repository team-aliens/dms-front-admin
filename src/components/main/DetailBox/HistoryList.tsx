import styled from 'styled-components';
import { Text } from '@team-aliens/design-system';
import { StudentDetailPointList } from './StudentDetailPoint';
import { PointHistoryList } from '@/context/pointHistoryList';
import { IsUseAbleFeature } from '@/apis/auth/response';
import { StudentInfo } from '@/apis/managers/response';

interface PropsType {
  studentList: StudentInfo[];
  pointHistoryList: PointHistoryList[];
  studentId: string[];
  availableFeature: IsUseAbleFeature;
}

export function HistoryList({
  studentList,
  pointHistoryList,
  studentId,
  availableFeature,
}: PropsType) {
  return (
    <>
      <_PointDetailBox isSelected={studentId.length > 0}>
        {availableFeature.point_service
          ? pointHistoryList
              .filter((i) => studentId.includes(i.studentId))
              .map(({ name, gcn, studentId, list }) => (
                <StudentDetailPointList
                  key={studentId}
                  name={name}
                  gcn={gcn}
                  historyList={list}
                  availableFeature={availableFeature}
                />
              ))
          : studentList
              .filter((res) => studentId.includes(res.id))
              .map(({ name, id, gcn }) => (
                <StudentDetailPointList
                  key={id}
                  name={name}
                  gcn={gcn}
                  availableFeature={availableFeature}
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
