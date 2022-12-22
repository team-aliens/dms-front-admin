import styled from 'styled-components';
import { WithNavigatorBar } from '@/components/WithNavigatorBar';
import { StudyListOptions } from '@/components/apply/ListOptions';
import { StudyCard } from '@/components/apply/StudyCard';

export function StudyRoomList() {
  return (
    <WithNavigatorBar>
      <_Wrapper>
        <StudyListOptions />
        <_List>
          <StudyCard />
          <StudyCard />
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
