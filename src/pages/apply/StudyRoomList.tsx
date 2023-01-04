import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { WithNavigatorBar } from '@/components/WithNavigatorBar';
import { StudyListOptions } from '@/components/apply/ListOptions';
import { StudyCard } from '@/components/apply/StudyCard';
import { useGetApplicationTime, useStudyRoomList } from '@/apis/studyRooms';

export function StudyRoomList() {
  const { data: list } = useStudyRoomList();
  const { data: applicationTime } = useGetApplicationTime();
  return (
    <WithNavigatorBar>
      <_Wrapper>
        <StudyListOptions {...applicationTime} />
        <_List>
          {list?.study_rooms.map((i) => (
            <Link to={`/apply/detail/${i.id}`}>
              <StudyCard {...i} />
            </Link>
          ))}
        </_List>
      </_Wrapper>
    </WithNavigatorBar>
  );
}

const _Wrapper = styled.div`
  width: 990px;
  margin: 0 auto;
  padding: 100px 0;
`;

const _List = styled.ul`
  margin-top: 47px;
  display: flex;
  flex-wrap: wrap;
  gap: 50px 75px;
`;
