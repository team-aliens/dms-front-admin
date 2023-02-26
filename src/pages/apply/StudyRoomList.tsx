import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Add, Button, Gear, Trash } from '@team-aliens/design-system';
import { WithNavigatorBar } from '@/components/WithNavigatorBar';
import { StudyListOptions } from '@/components/apply/ListOptions';
import { StudyCard } from '@/components/apply/StudyCard';
import { useGetApplicationTime, useStudyRoomList } from '@/apis/studyRooms';
import { useModal } from '@/hooks/useModal';
import {
  AddStudyRoomTimeModal,
  ApplicationTime,
} from '@/components/modals/AddStudyRoomTime';
import { DeleteStudyRoomTimeModal } from '@/components/modals/DeleteStudyRoomTime';

export interface IStudyRoomTime {
  startAt: string;
  endAt: string;
}

export function StudyRoomList() {
  const { closeModal, selectModal, modalState } = useModal();
  const openAddStudyRoomTimeModal = () => selectModal('ADD_STUDY_ROOM_TIME');
  const openEditStudyRoomTimeModal = () => selectModal('EDIT_STUDY_ROOM_TIME');
  const openDeleteStudyRoomTimeModal = () =>
    selectModal('DELETE_STUDY_ROOM_TIME');

  const [studyRoomTimeList, setStudyRoomTimeList] = useState<ApplicationTime[]>(
    [],
  );
  const [current, setCurrent] = useState(0);
  const [studyRoomTime] = useState<IStudyRoomTime>({
    startAt: '00:00',
    endAt: '00:00',
  });
  const { startAt, endAt } = studyRoomTime;

  const AddStudyRoomUseTime = (state: ApplicationTime) => {
    setStudyRoomTimeList([...studyRoomTimeList, state]);
  };

  const EditStudyRoomUseTime = (state: ApplicationTime) => {
    const copiedItems = [...studyRoomTimeList];
    copiedItems[current] = state;
    setStudyRoomTimeList(copiedItems);
  };

  const DeleteStudyRoomUseTime = () => {
    setStudyRoomTimeList(studyRoomTimeList.filter((_, i) => current !== i));
    closeModal();
  };

  const { data: list } = useStudyRoomList();
  const { data: applicationTime } = useGetApplicationTime();
  return (
    <WithNavigatorBar>
      <_Wrapper>
        <StudyListOptions {...applicationTime} />
        <_Buttons>
          <Button
            onClick={openAddStudyRoomTimeModal}
            color="gray"
            kind="outline"
            Icon={<Add />}
          />
          {studyRoomTimeList.map((studyRomTime, idx) => {
            const { startHour, startMin, endHour, endMin } = studyRomTime;
            return (
              <Button
                onClick={() => setCurrent(idx)}
                color={current === idx ? 'primary' : 'gray'}
                kind={current === idx ? 'contained' : 'outline'}
              >
                {startHour}시 {startMin !== '00' && `${startMin}분`} ~ {endHour}
                시 {endMin !== '00' && `${endMin}분`}
                {current === idx && (
                  <>
                    <_Line />
                    <_Border onClick={openEditStudyRoomTimeModal}>
                      <Gear colorKey="gray1" size={18} />
                    </_Border>
                    <_Border onClick={openDeleteStudyRoomTimeModal}>
                      <Trash colorKey="gray1" size={18} />
                    </_Border>
                  </>
                )}
              </Button>
            );
          })}
        </_Buttons>
        <_List>
          {list?.study_rooms.map((i) => (
            <Link to={`/apply/detail/${i.id}`}>
              <StudyCard {...i} />
            </Link>
          ))}
        </_List>
      </_Wrapper>
      {modalState.selectedModal === 'ADD_STUDY_ROOM_TIME' && (
        <AddStudyRoomTimeModal
          type="CREATE"
          onClick={AddStudyRoomUseTime}
          close={closeModal}
          startAt={startAt}
          endAt={endAt}
        />
      )}
      {modalState.selectedModal === 'EDIT_STUDY_ROOM_TIME' && (
        <AddStudyRoomTimeModal
          type="EDIT"
          onClick={EditStudyRoomUseTime}
          close={closeModal}
          startAt={`${studyRoomTimeList[current].startHour}:${studyRoomTimeList[current].startMin}`}
          endAt={`${studyRoomTimeList[current].endHour}:${studyRoomTimeList[current].endMin}`}
        />
      )}
      {modalState.selectedModal === 'DELETE_STUDY_ROOM_TIME' && (
        <DeleteStudyRoomTimeModal
          close={closeModal}
          onClick={DeleteStudyRoomUseTime}
        />
      )}
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

const _Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 40px;
`;

const _Line = styled.div`
  width: 1px;
  height: 26px;
  border: 1px solid #579aff;
  margin: 10px;
`;

const _Border = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  background-color: #2b7fff;
  border-radius: 50px;
`;
