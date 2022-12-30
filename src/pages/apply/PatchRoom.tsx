import { usePatchStudyRoom, useStudyRoomDetail } from '@/apis/studyRooms';
import { useParams } from 'react-router-dom';
import { BreadCrumb } from '@team-aliens/design-system';
import { StudyRoom } from '@team-aliens/design-system/dist/components/studyRoom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { CreateStudyRoomOptions } from '@/components/apply/CreateOptions';
import { WithNavigatorBar } from '@/components/WithNavigatorBar';
import { CreateStudyRoomDetailOptions } from '@/components/apply/DetailOptions';
import { useModal } from '@/hooks/useModal';
import { SeatSetting } from '@/components/apply/SeatSetting';
import { useDeleteSeatType, useSeatTypeList } from '@/apis/studyRooms';
import { AddSeatType } from '@/components/modals/AddSeatType';
import { useStudyRoom } from '@/hooks/useStudyRoom';
import { Seat } from '@/apis/studyRooms/request';
import { SeatPreview } from '@/apis/studyRooms/response';
import { pathToKorean } from '@/router';

export const PatchRoom = () => {
  const { id } = useParams();
  const { data: detail } = useStudyRoomDetail(id);

  const [seatSetting, setSeatSetting] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>('');
  const { selectModal, modalState, closeModal } = useModal();

  const {
    studyRoomState,
    onChangeGrade,
    onChangeInput,
    onChangeSex,
    onChangeSeatSetting,
    initalValue,
  } = useStudyRoom();

  useEffect(() => {
    initalValue(detail);
  }, [detail]);

  const { name, floor, total_height_size, total_width_size, ...rest } =
    studyRoomState;

  const { seat, ...creatStudyRoomRequest } = studyRoomState;

  const { data: seatTypeList, refetch: refetchTypeList } = useSeatTypeList();

  const patchStudyRoom = usePatchStudyRoom(id, {
    ...creatStudyRoomRequest,
    seats: creatStudyRoomRequest.seats.map(
      (i): Seat => ({
        width_location: i.width_location,
        height_location: i.height_location,
        number: i.number || null,
        status: i.status === 'IN_USE' ? 'AVAILABLE' : i.status,
        type_id: i.type?.id || null,
      }),
    ),
  });

  const closeSeatSetting = () => setSeatSetting(false);

  const deleteType = useDeleteSeatType(deleteId, {
    onSuccess: () => refetchTypeList(),
  });

  const deleteSeatType = async (id: string) => {
    await setDeleteId(id);
    deleteType.mutate();
  };

  const onChangeSelectedPosition = (x: number, y: number) => {
    setSeatSetting(true);
    const [alreadyUsedValue] = studyRoomState.seats.filter(
      (i) => i.height_location === y + 1 && i.width_location === x + 1,
    );
    onChangeSeatSetting({
      width_location: x,
      height_location: y,
      type: alreadyUsedValue?.type || null,
      status: alreadyUsedValue?.status || 'EMPTY',
      number: alreadyUsedValue?.number || null,
    });
  };
  console.log(studyRoomState.seat);
  return (
    <WithNavigatorBar>
      {modalState.selectedModal === 'ADD_SEAT_TYPE' && (
        <AddSeatType
          closeModal={closeModal}
          refetchTypeList={refetchTypeList}
        />
      )}
      {seatSetting && (
        <SeatSetting
          selectModal={selectModal}
          seatTypeList={seatTypeList?.types || []}
          deleteSeatType={deleteSeatType}
          closeSeatSetting={closeSeatSetting}
        />
      )}
      <_Wrapper>
        <BreadCrumb left={351} pathToKorean={pathToKorean} />
        <CreateStudyRoomOptions
          onChange={onChangeInput}
          floor={floor}
          name={name}
          total_width_size={total_width_size}
          total_height_size={total_height_size}
        />
        <_Body>
          <StudyRoom
            {...rest}
            seats={studyRoomState.seats.map(
              (i): SeatPreview => ({
                ...i,
                student: null,
              }),
            )}
            isEdit
            selectedPosition={{
              x: studyRoomState.seat.width_location,
              y: studyRoomState.seat.height_location,
            }}
            onClickSeat={onChangeSelectedPosition}
            total_width_size={total_width_size}
            total_height_size={total_height_size}
          />
          <CreateStudyRoomDetailOptions
            onChangeSegmented={onChangeSex}
            onChangeInput={onChangeInput}
            onChangeGrade={onChangeGrade}
            createStudyRoom={patchStudyRoom.mutate}
            patch={true}
            {...rest}
          />
        </_Body>
      </_Wrapper>
    </WithNavigatorBar>
  );
};

const _Wrapper = styled.section`
  width: 1040px;
  margin: 0 auto;
  margin-top: 140px;
  margin-bottom: 50px;
`;

const _Body = styled.div`
  display: flex;
  margin-top: 78px;
`;
