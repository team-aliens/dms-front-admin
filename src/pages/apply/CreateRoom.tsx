import { BreadCrumb } from '@team-aliens/design-system';
import styled from 'styled-components';
import { useState } from 'react';
import { CreateStudyRoomOptions } from '@/components/apply/CreateOptions';
import { WithNavigatorBar } from '@/components/WithNavigatorBar';
import { StudyRoomEditer } from '@/components/apply/StudyRoomEditer';
import { CreateStudyRoomDetailOptions } from '@/components/apply/DetailOptions';
import { useModal } from '@/hooks/useModal';
import { SeatSetting } from '@/components/apply/SeatSetting';
import { useCreateStudyRoom, useSeatType } from '@/apis/studyRooms';
import { AddSeatType } from '@/components/modals/AddSeatType';
import { useStudyRoom } from '@/hooks/useStudyRoom';

const pathToKorean = {
  apply: '신청',
};

export function CreateRoom() {
  const [seatSetting, setSeatSetting] = useState(false);
  const { selectModal, modalState, closeModal } = useModal();
  const {
    studyRoomState, onChangeGrade, onChangeInput, onChangeSex,
  } =
    useStudyRoom();
  const {
    name, floor, total_height_size, total_width_size, ...rest
  } =
    studyRoomState;
  const { seat, ...creatStudyRoomRequest } = studyRoomState;
  const { data: seatTypeList } = useSeatType();
  const createStudyRoom = useCreateStudyRoom(creatStudyRoomRequest);
  return (
    <WithNavigatorBar>
      {modalState.selectedModal === 'ADD_SEAT_TYPE' && (
        <AddSeatType closeModal={closeModal} />
      )}
      {seatSetting && (
        <SeatSetting
          selectModal={selectModal}
          seatTypeList={seatTypeList?.types || []}
        />
      )}
      <_Wrapper>
        <BreadCrumb pathToKorean={pathToKorean} />
        <CreateStudyRoomOptions
          onChange={onChangeInput}
          floor={floor}
          name={name}
          total_width_size={total_width_size}
          total_height_size={total_height_size}
        />
        <_Body>
          <StudyRoomEditer />
          <CreateStudyRoomDetailOptions
            onChangeSegmented={onChangeSex}
            onChangeInput={onChangeInput}
            onChangeGrade={onChangeGrade}
            createStudyRoom={createStudyRoom.mutate}
            {...rest}
          />
        </_Body>
      </_Wrapper>
    </WithNavigatorBar>
  );
}

const _Wrapper = styled.section`
  width: 1030px;
  margin: 0 auto;
  padding-top: 86px;
`;

const _Body = styled.div`
  display: flex;
  margin-top: 78px;
`;
