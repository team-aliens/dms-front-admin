import { BreadCrumb } from '@team-aliens/design-system';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { WithNavigatorBar } from '@/components/WithNavigatorBar';
import {
  useDeleteStudyRoom,
  useSeatTypeList,
  useStudyRoomDetail,
} from '@/apis/studyRooms';
import { StudyRoomDetailSummary } from '@/components/apply/DetailSummary';
import { useModal } from '@/hooks/useModal';
import { DeleteStudyRoom } from '@/components/modals/DeleteStudyRoom';
import { StudyRoomEditer } from '@/components/apply/StudyRoomEditer';
import { SeatTypeList } from '@/components/apply/SeatTypeList';
import { AppliedStudentList } from '@/components/apply/AppliedStudentList';

const pathToKorean = {
  apply: '신청',
  studyRoom: '자습실',
};

export function StudyRoomDetail() {
  const { id } = useParams();
  const { data: detail } = useStudyRoomDetail(id);
  const { selectModal, closeModal, modalState } = useModal();
  const deleteStudyRoom = useDeleteStudyRoom(id);
  const { data: typeList } = useSeatTypeList();
  return (
    <WithNavigatorBar>
      {modalState.selectedModal === 'DELETE_STUDY_ROOM' && (
        <DeleteStudyRoom
          close={closeModal}
          deleteStudyRoom={deleteStudyRoom.mutate}
        />
      )}
      <_Wrapper>
        <BreadCrumb pathToKorean={pathToKorean} />
        <StudyRoomDetailSummary
          detail={detail}
          id={id}
          selectModal={() => selectModal('DELETE_STUDY_ROOM')}
        />
        <_SeatDetails>
          <StudyRoomEditer />
          <section>
            <SeatTypeList seatTypes={typeList?.types || []} />
            <AppliedStudentList studentList={detail?.seats || []} />
          </section>
        </_SeatDetails>
      </_Wrapper>
    </WithNavigatorBar>
  );
}

const _Wrapper = styled.section`
  width: 1060px;
  margin: 0 auto;
  padding-top: 86px;
`;

const _SeatDetails = styled.div`
  display: flex;
  margin-top: 52px;
  > section {
    margin-left: 16px;
  }
`;
