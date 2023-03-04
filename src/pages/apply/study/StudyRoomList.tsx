import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Add, Button, Gear, Trash } from '@team-aliens/design-system';
import { WithNavigatorBar } from '@/components/WithNavigatorBar';
import { StudyListOptions } from '@/components/apply/study/ListOptions';
import { StudyCard } from '@/components/apply/study/StudyCard';
import {
  useGetApplicationTime,
  useSetApplicationTime,
  useStudyRoomList,
} from '@/apis/studyRooms';
import { useModal } from '@/hooks/useModal';
import { pagePath } from '@/utils/pagePath';
import {
  ApplicationTime,
  SetApplicationTimeModal,
} from '@/components/modals/SetApplicationTime';
import { useToast } from '@/hooks/useToast';

export function StudyRoomList() {
  const { closeModal, selectModal, modalState } = useModal();
  const { toastDispatch } = useToast();
  // const openAddStudyRoomTimeModal = () => selectModal('ADD_STUDY_ROOM_TIME');
  // const openEditStudyRoomTimeModal = () => selectModal('EDIT_STUDY_ROOM_TIME');
  // const openDeleteStudyRoomTimeModal = () =>
  //   selectModal('DELETE_STUDY_ROOM_TIME');

  // const [studyRoomTimeList, setStudyRoomTimeList] = useState<ApplicationTime[]>(
  //   [],
  // );
  const { data: applicationTime, refetch } = useGetApplicationTime();
  const [globalApplicationTime, onHandleChange] = useState<ApplicationTime>({
    startHour: '00',
    startMin: '00',
    endHour: '00',
    endMin: '00',
  });

  useEffect(() => {
    if (applicationTime?.start_at && applicationTime?.end_at) {
      const [startHour, startMin] = applicationTime.start_at.split(':');
      const [endHour, endMin] = applicationTime.end_at.split(':');
      onHandleChange({
        ...globalApplicationTime,
        startHour,
        startMin,
        endHour,
        endMin,
      });
    }
  }, [applicationTime]);

  const onChangeApplicationTime = (
    type: keyof ApplicationTime,
    value: string,
  ) => {
    onHandleChange({
      ...globalApplicationTime,
      [type]: value,
    });
  };
  const setApplicationTime = useSetApplicationTime(
    {
      start_at: `${globalApplicationTime.startHour}:${globalApplicationTime.startMin}:00`,
      end_at: `${globalApplicationTime.endHour}:${globalApplicationTime.endMin}:00`,
    },
    {
      onSuccess: () => {
        closeModal();
        refetch();
        toastDispatch({
          toastType: 'SUCCESS',
          actionType: 'APPEND_TOAST',
          message: '신청 시간 수정이 완료되었습니다.',
        });
      },
      onError: () => {
        toastDispatch({
          toastType: 'ERROR',
          actionType: 'APPEND_TOAST',
          message: '수정할 신청 시간을 다시 확인 해 주세요.',
        });
      },
    },
  );
  // const [hover, setHover] = useState<boolean>(false);
  // const [current, setCurrent] = useState<number>(0);

  // const AddStudyRoomUseTime = (state: ApplicationTime) => {
  //   setStudyRoomTimeList([...studyRoomTimeList, state]);
  // };

  // const EditStudyRoomUseTime = (state: ApplicationTime) => {
  //   const copiedItems = [...studyRoomTimeList];
  //   copiedItems[current] = state;
  //   setStudyRoomTimeList(copiedItems);
  // };

  // const DeleteStudyRoomUseTime = () => {
  //   setStudyRoomTimeList(studyRoomTimeList.filter((_, i) => current !== i));
  //   closeModal();
  // };

  const { data: list } = useStudyRoomList();

  return (
    <WithNavigatorBar>
      <_Wrapper>
        <StudyListOptions
          onChangeDropdown={onChangeApplicationTime}
          setApplicationTime={setApplicationTime.mutate}
          startHour={globalApplicationTime.startHour}
          startMin={globalApplicationTime.startMin}
          endHour={globalApplicationTime.endHour}
          endMin={globalApplicationTime.endMin}
        />
        {/* <_Buttons>
          <Button
            onClick={openAddStudyRoomTimeModal}
            color="gray"
            kind="outline"
            Icon={<Add />}
          />
          {studyRoomTimeList.map((studyRomTime, idx) => {
            const { startHour, startMin, endHour, endMin } = studyRomTime;
            return (
              <div
                onMouseEnter={() => current === idx && setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                <Button
                  onClick={() => setCurrent(idx)}
                  color={current === idx ? 'primary' : 'gray'}
                  kind={current === idx ? 'contained' : 'outline'}
                >
                  {startHour}시 {startMin !== '00' && `${startMin}분`} ~{' '}
                  {endHour}시 {endMin !== '00' && `${endMin}분`}
                  {hover && current === idx && (
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
              </div>
            );
          })}
        </_Buttons> */}
        <_List>
          {list?.study_rooms.map((i) => (
            <Link to={pagePath.apply.studyRoom.deatail(i.id)}>
              <StudyCard {...i} />
            </Link>
          ))}
        </_List>
      </_Wrapper>
      {modalState.selectedModal === 'ADD_STUDY_ROOM_TIME' && (
        <SetApplicationTimeModal
          setApplicationTime={() => {}}
          onChangeDropdown={onChangeApplicationTime}
          close={closeModal}
          startHour={globalApplicationTime.startHour}
          startMin={globalApplicationTime.startMin}
          endHour={globalApplicationTime.endHour}
          endMin={globalApplicationTime.endMin}
        />
      )}
      {/* {modalState.selectedModal === 'DELETE_STUDY_ROOM_TIME' && (
        <DeleteStudyRoomTimeModal
          close={closeModal}
          onClick={DeleteStudyRoomUseTime}
        />
      )} */}
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
