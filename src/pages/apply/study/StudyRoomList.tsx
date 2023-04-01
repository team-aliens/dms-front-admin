import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BreadCrumb, Button, Add } from '@team-aliens/design-system';
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
import CreateStudyTimeModal from '@/components/modals/StudyTimeModal';
import { DeleteStudyRoomTimeModal } from '@/components/modals/DeleteStudyRoomTime';
import PrintStudyRoomApplyModal from '@/components/modals/PrintStudyRoomApplyModal';
import StudyTimeModal from '@/components/modals/StudyTimeModal';
import { pathToKorean } from '@/router';

export function StudyRoomList() {
  const { closeModal, selectModal, modalState } = useModal();
  const { toastDispatch } = useToast();
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
  const { data: studyTimeSlots, mutateAsync: mutateStudyTimeSlots } =
    useStudyTimeSlots();
  const [selectTimeCardId, setSelectTimeCardId] = useState('');
  const [clickTimeCardId, setClickTimeCardId] = useState('');
  const { data: list, mutate: mutateStudyRoomList } = useStudyRoomList({
    time_slot: selectTimeCardId ?? studyTimeSlots[0],
  });

  useEffect(() => {
    mutateStudyRoomList();
  }, [selectTimeCardId]);

  useEffect(() => {
    if (modalState.selectedModal === 'ADD_STUDY_ROOM_TIME') return;
    mutateStudyTimeSlots();
  }, [modalState]);

  useEffect(() => {
    mutateStudyTimeSlots().then((res) => {
      setSelectTimeCardId(res.time_slots[0].id);
      mutateStudyRoomList();
    });
  }, []);

  return (
    <WithNavigatorBar>
      <BreadCrumb top={46} left={351} pathToKorean={pathToKorean} />
      <_Wrapper>
        <StudyListOptions
          onChangeDropdown={onChangeApplicationTime}
          setApplicationTime={setApplicationTime}
          startHour={globalApplicationTime.startHour}
          startMin={globalApplicationTime.startMin}
          endHour={globalApplicationTime.endHour}
          endMin={globalApplicationTime.endMin}
        />
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
        <StudyTimeModal ModalType="create" closeModal={closeModal} />
      )}
      {modalState.selectedModal === 'DELETE_STUDY_ROOM_TIME' && (
        <DeleteStudyRoomTimeModal
          timeSlotId={clickTimeCardId}
          closeModal={closeModal}
        />
      )}
      {modalState.selectedModal === 'EDIT_STUDY_ROOM_TIME' && (
        <StudyTimeModal
          initTimeSlots={studyTimeSlots}
          closeModal={closeModal}
          timeSlotId={clickTimeCardId}
          ModalType={'edit'}
        />
      )}
      {modalState.selectedModal === 'PRINT_STUDY_ROOM_APPLY' && (
        <PrintStudyRoomApplyModal closeModal={closeModal} />
      )}
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
  overflow: scroll;
  ::-webkit-scrollbar {
    height: 8px;
  }
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
