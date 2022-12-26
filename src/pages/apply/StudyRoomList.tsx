import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { WithNavigatorBar } from '@/components/WithNavigatorBar';
import { StudyListOptions } from '@/components/apply/ListOptions';
import { StudyCard } from '@/components/apply/StudyCard';
import { useStudyRoomList } from '@/apis/studyRooms';

export function StudyRoomList() {
  const { data: list } = useStudyRoomList();
  return (
    <WithNavigatorBar>
      <_Wrapper>
        <StudyListOptions />
        <_List>
          {list?.study_rooms.map((i) => (
            <Link to={`/apply/detail/${i.id}`}>
              <StudyCard {...i} />
            </Link>
          ))}
          {/* <StudyCard /> */}
        </_List>
      </_Wrapper>
    </WithNavigatorBar>
  );
}

const _Wrapper = styled.div`
  width: 990px;
  margin: 0 auto;
  padding-top: 100px;
`;

const _List = styled.ul`
  margin-top: 47px;
  display: flex;
  flex-wrap: wrap;
  gap: 50px 75px;
`;
