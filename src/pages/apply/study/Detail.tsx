import { BreadCrumb, StudyRoom } from '@team-aliens/design-system';
import styled from 'styled-components';
import { useLocation, useParams } from 'react-router-dom';
import { WithNavigatorBar } from '@/components/WithNavigatorBar';
import { useEffect } from 'react';
import {
  useDeleteStudyRoom,
  useSeatTypeList,
  useStudyRoomDetail,
} from '@/apis/studyRooms';
import { StudyRoomDetailSummary } from '@/components/apply/study/DetailSummary';
import { useModal } from '@/hooks/useModal';
import { DeleteStudyRoom } from '@/components/modals/DeleteStudyRoom';
import { SeatTypeList } from '@/components/apply/study/SeatTypeList';
import { AppliedStudentList } from '@/components/apply/study/AppliedStudentList';
import { pathToKorean } from '@/router';
import StudyTimeOptions from '@/components/apply/study/StudyTimeOptions';
import { useForm } from '@/hooks/useForm';

export function StudyRoomDetail() {
  const { id } = useParams();
  const location = useLocation();

  let timeSlotId = location.state.timeSlotId;
  const { state: timeSlotState, setState: setTimeSlotState } =
    useForm(timeSlotId);
  const { data: detail, refetch } = useStudyRoomDetail(id, timeSlotState);
  const { selectModal, closeModal, modalState } = useModal();
  const deleteStudyRoom = useDeleteStudyRoom(id);
  const { data: typeList } = useSeatTypeList(id);

  useEffect(() => {
    timeSlotId = timeSlotState;
  }, [timeSlotState]);

  return (
    <WithNavigatorBar>
      {modalState.selectedModal === 'DELETE_STUDY_ROOM' && (
        <DeleteStudyRoom
          close={closeModal}
          deleteStudyRoom={deleteStudyRoom.mutate}
        />
      )}
      <_Wrapper>
        <BreadCrumb top={46} left={351} pathToKorean={pathToKorean} />
        <StudyRoomDetailSummary
          detail={detail}
          id={id}
          selectModal={() => selectModal('DELETE_STUDY_ROOM')}
          timeSlotId={timeSlotId}
        />
        <StudyTimeOptions
          timeSlotId={timeSlotId}
          setTimeSlotState={setTimeSlotState}
          refetch={refetch}
        />
        <_SeatDetails>
          {detail && <StudyRoom {...detail} />}
          <section>
            <SeatTypeList seatTypes={typeList?.types || []} />
            <AppliedStudentList
              studentList={
                detail?.seats.filter((item) => item.status === 'IN_USE') || []
              }
            />
          </section>
        </_SeatDetails>
      </_Wrapper>
    </WithNavigatorBar>
  );
}

const _Wrapper = styled.section`
  width: 1060px;
  margin: 0 auto;
  padding: 110px 0 50px 0;
`;

const _SeatDetails = styled.div`
  display: flex;
  margin-top: 52px;
  > section {
    margin-left: 16px;
  }
`;
