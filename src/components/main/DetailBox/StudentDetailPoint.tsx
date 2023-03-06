import { Text } from '@team-aliens/design-system';
import styled from 'styled-components';
import { useStudentPointHistory } from '@/hooks/usePointsApi';
import { PointItem } from './PointItem';
import { useStudentDetail } from '@/hooks/useMangersApis';
import { StudentPointHistoryResponse } from '@/apis/points/response';

interface PropsType {
  id: string;
}

export function StudentDetailPointList({ id }: PropsType) {
  const { data: studentPointHistory } = useStudentPointHistory(id, 0, 4);
  const { data: studentDetail } = useStudentDetail(id);

  const { data: studentPointHistory, refetch: refetchStudentPointHistory } =
    useStudentPointHistory(id);

  return (
    <>
      <_StudentNameNumber>
        <Text color="gray10" size="bodyL">
          {studentDetail?.name}
        </Text>
        <Text color="gray6" size="bodyS">
          {studentDetail?.gcn}
        </Text>
      </_StudentNameNumber>
      <_PointItemList>
        {studentPointHistory?.point_histories.map((history) => {
          const { name, point_history_id, score, type } = history;
          return (
            <PointItem
              key={point_history_id}
              canDelete={false}
              name={name}
              point_history_id={point_history_id}
              score={score}
              type={type}
            />
          );
        })}
      </_PointItemList>
    </>
  );
}

const _PointItemList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 9px;
`;

const _StudentNameNumber = styled.div`
  display: flex;
  align-items: center;
  margin: 40px 0 7px 0;
  gap: 12px;
`;
