import { Text } from '@team-aliens/design-system';
import styled from 'styled-components';
import { PointItem } from './PointItem';
import { StudentPointHistoryType } from '@/apis/points/response';

interface PropsType {
  name: string;
  gcn: string;
  historyList: StudentPointHistoryType[];
}

export function StudentDetailPointList({ name, gcn, historyList }: PropsType) {
  return (
    <>
      <_StudentNameNumber>
        <Text color="gray10" size="bodyL">
          {name}
        </Text>
        <Text color="gray6" size="bodyS">
          {gcn}
        </Text>
      </_StudentNameNumber>
      <_PointItemList>
        {historyList.slice(0, 4).map((history) => {
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
