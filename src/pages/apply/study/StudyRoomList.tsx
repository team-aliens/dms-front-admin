import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, Add } from '@team-aliens/design-system';
import { WithNavigatorBar } from '@/components/WithNavigatorBar';
import { StudyListOptions } from '@/components/apply/study/ListOptions';
import { StudyCard } from '@/components/apply/study/StudyCard';
import {
  useGetApplicationTime,
  useSetApplicationTime,
  useStudyRoomList,
  useStudyTimeSlots,
} from '@/apis/studyRooms';
import { useModal } from '@/hooks/useModal';
import { pagePath } from '@/utils/pagePath';
import {
  ApplicationTime,
  SetApplicationTimeModal,
} from '@/components/modals/SetApplicationTime';
import { useToast } from '@/hooks/useToast';
import TimeCard from '@/components/apply/study/TimeCard';
import CreateStudyTimeModal from '@/components/modals/CreateStudyTimeModal';
import { DeleteStudyRoomTimeModal } from '@/components/modals/DeleteStudyRoomTime';
import EditStudyTimeModal from '@/components/modals/EditStudyTimeModal';
import PrintStudyRoomApplyModal from '@/components/modals/PrintStudyRoomApplyModal';

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
  const { mutate: setApplicationTime } = useSetApplicationTime(
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
  const { data: studyTimeSlots, mutate: mutateStudyTimeSlots } =
    useStudyTimeSlots();
  const [selectTimeCardId, setSelectTimeCardId] = useState('');
  const [clickTimeCardId, setClickTimeCardId] = useState('');
  const { data: list, mutate: mutateStudyRoomList } = useStudyRoomList({
    time_slot: selectTimeCardId,
  });

  useEffect(() => {
    mutateStudyRoomList();
  }, [selectTimeCardId]);

  useEffect(() => {
    mutateStudyTimeSlots();
  }, [modalState]);

  return (
    <WithNavigatorBar>
      <_Wrapper>
        <StudyListOptions
          onChangeDropdown={onChangeApplicationTime}
          setApplicationTime={setApplicationTime}
          startHour={globalApplicationTime.startHour}
          startMin={globalApplicationTime.startMin}
          endHour={globalApplicationTime.endHour}
          endMin={globalApplicationTime.endMin}
        />
        {/*<_Buttons>*/}
        {/*  <Button*/}
        {/*    onClick={openAddStudyRoomTimeModal}*/}
        {/*    color="gray"*/}
        {/*    kind="outline"*/}
        {/*    Icon={<Add />}*/}
        {/*  />*/}
        {/*  {studyRoomTimeList.map((studyRomTime, idx) => {*/}
        {/*    const { startHour, startMin, endHour, endMin } = studyRomTime;*/}
        {/*    return (*/}
        {/*      <div*/}
        {/*        onMouseEnter={() => current === idx && setHover(true)}*/}
        {/*        onMouseLeave={() => setHover(false)}*/}
        {/*      >*/}
        {/*        <Button*/}
        {/*          onClick={() => setCurrent(idx)}*/}
        {/*          color={current === idx ? 'primary' : 'gray'}*/}
        {/*          kind={current === idx ? 'contained' : 'outline'}*/}
        {/*        >*/}
        {/*          {startHour}시 {startMin !== '00' && `${startMin}분`} ~{' '}*/}
        {/*          {endHour}시 {endMin !== '00' && `${endMin}분`}*/}
        {/*          {hover && current === idx && (*/}
        {/*            <>*/}
        {/*              <_Line />*/}
        {/*              <_Border onClick={openEditStudyRoomTimeModal}>*/}
        {/*                <Gear colorKey="gray1" size={18} />*/}
        {/*              </_Border>*/}
        {/*              <_Border onClick={openDeleteStudyRoomTimeModal}>*/}
        {/*                <Trash colorKey="gray1" size={18} />*/}
        {/*              </_Border>*/}
        {/*            </>*/}
        {/*          )}*/}
        {/*        </Button>*/}
        {/*      </div>*/}
        {/*    );*/}
        {/*  })}*/}
        {/*</_Buttons>*/}
        <_TimeList>
          <Button
            kind={'outline'}
            size={'default'}
            Icon={<Add />}
            color={'gray'}
            onClick={() => selectModal('ADD_STUDY_ROOM_TIME')}
          >
            {studyTimeSlots?.time_slots ? '' : '이용시간을 추가해주세요.'}
          </Button>
          {studyTimeSlots?.time_slots?.map((timeSlot) => (
            <TimeCard
              setClickId={setClickTimeCardId}
              selectId={selectTimeCardId}
              setSelectId={setSelectTimeCardId}
              selectModal={selectModal}
              prevId={timeSlot.id}
              timeSlot={timeSlot}
            />
          ))}
        </_TimeList>
        <_List>
          {list?.study_rooms.map((i) => (
            <Link
              to={pagePath.apply.studyRoom.deatail(i.id)}
              state={{ timeSlotId: selectTimeCardId }}
            >
              <StudyCard {...i} />
            </Link>
          ))}
        </_List>
      </_Wrapper>
      {modalState.selectedModal === 'SET_STUDY_ROOM_APPLY_TIME' && (
        <SetApplicationTimeModal
          setApplicationTime={setApplicationTime}
          onChangeDropdown={onChangeApplicationTime}
          close={closeModal}
          startHour={globalApplicationTime.startHour}
          startMin={globalApplicationTime.startMin}
          endHour={globalApplicationTime.endHour}
          endMin={globalApplicationTime.endMin}
        />
      )}
      {modalState.selectedModal === 'ADD_STUDY_ROOM_TIME' && (
        <CreateStudyTimeModal closeModal={closeModal} />
      )}
      {modalState.selectedModal === 'DELETE_STUDY_ROOM_TIME' && (
        <DeleteStudyRoomTimeModal
          timeSlotId={clickTimeCardId}
          closeModal={closeModal}
        />
      )}
      {modalState.selectedModal === 'EDIT_STUDY_ROOM_TIME' && (
        <EditStudyTimeModal
          initTimeSlots={studyTimeSlots}
          closeModal={closeModal}
          timeSlotId={clickTimeCardId}
        />
      )}
      {modalState.selectedModal === 'PRINT_STUDY_ROOM_APPLY' && (
        <PrintStudyRoomApplyModal closeModal={closeModal} />
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
const _TimeList = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 40px;
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
