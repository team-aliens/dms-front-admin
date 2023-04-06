import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { BreadCrumb } from '@team-aliens/design-system';
import { StudyRoom } from '@team-aliens/design-system/dist/components/studyRoom';
import {
  usePatchStudyRoom,
  useStudyRoomDetail,
  useDeleteSeatType,
  useSeatTypeList,
} from '@/apis/studyRooms';
import { CreateStudyRoomOptions } from '@/components/apply/study/CreateOptions';
import { WithNavigatorBar } from '@/components/WithNavigatorBar';
import { CreateStudyRoomDetailOptions } from '@/components/apply/study/DetailOptions';
import { useModal } from '@/hooks/useModal';
import { SeatSetting } from '@/components/apply/study/SeatSetting';

import { AddSeatType } from '@/components/modals/AddSeatType';
import { useStudyRoom } from '@/hooks/useStudyRoom';
import { Seat, StudyRoomErrorMessage } from '@/apis/studyRooms/request';
import { SeatPreview } from '@/apis/studyRooms/response';
import { pathToKorean } from '@/router';
import { pagePath } from '@/utils/pagePath';
import { useForm } from '@/hooks/useForm';
import { useObj } from '@/hooks/useObj';

export const PatchRoom = () => {
  const { id } = useParams();
  const { state: timeSlotId, setState: setTimeSlotId } = useForm<string[]>([]);
  const location = useLocation();
  const timeSlot = location.state.timeSlotId;
  const { data: detail } = useStudyRoomDetail(id, timeSlot); //여기

  const [seatSetting, setSeatSetting] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>('');
  const { selectModal, modalState, closeModal } = useModal();

  const {
    studyRoomState,
    onChangeGrade,
    onChangeInput,
    onChangeSex,
    onChangeSeatSetting,
    onChangeStudyTime,
    initalValue,
  } = useStudyRoom();

  const default_time_slots_id = () => {
    return detail.time_slots.map((data) => {
      return data.id;
    });
  };

  useEffect(() => {
    initalValue(detail);
  }, [detail]);

  const {
    name,
    floor,
    total_height_size,
    total_width_size,
    east_description,
    west_description,
    south_description,
    north_description,
    ...rest
  } = studyRoomState;

  const { seat, ...creatStudyRoomRequest } = studyRoomState;

  const { data: seatTypeList, refetch: refetchTypeList } = useSeatTypeList();

  const { mutateAsync: patchStudyRoom } = usePatchStudyRoom(id, {
    ...creatStudyRoomRequest,
    time_slot_ids: timeSlotId,
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
  const navigate = useNavigate();

  const deleteType = useDeleteSeatType(deleteId, {
    onSuccess: () => refetchTypeList(),
  });

  const deleteSeatType = async (seatId: string) => {
    await setDeleteId(seatId);
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

  const onClick = () => {
    patchStudyRoom().then(() => {
      navigate(pagePath.apply.studyRoom.list);
    });
  };

  const { obj: errorMessages, changeObjectValue: changeErrorMessage } =
    useObj<StudyRoomErrorMessage>({
      floor: '',
      name: '',
      eastDescription: '',
      westDescription: '',
      southDescription: '',
      northDescription: '',
    });

  const errorChange = () => {
    if (!floor || floor === 0)
      changeErrorMessage('floor', '1 이상이어야 합니다.');
    if (!name) changeErrorMessage('name', '공백일 수 없습니다.');
    if (!east_description)
      changeErrorMessage('eastDescription', '공백일 수 없습니다.');
    if (!west_description)
      changeErrorMessage('westDescription', '공백일 수 없습니다.');
    if (!north_description)
      changeErrorMessage('southDescription', '공백일 수 없습니다.');
    if (!south_description)
      changeErrorMessage('northDescription', '공백일 수 없습니다.');
    if (
      floor &&
      floor !== 0 &&
      name &&
      east_description &&
      west_description &&
      north_description &&
      south_description
    ) {
      return true;
    } else return false;
  };

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
          addSeat={modalState.selectedModal === 'ADD_SEAT_TYPE' ? true : false}
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
          errorMessages={errorMessages}
          errorChange={errorChange}
        />
        <_Body>
          <StudyRoom
            east_description={east_description}
            west_description={west_description}
            north_description={north_description}
            south_description={south_description}
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
            setTimeSlotId={(ids: string[]) => {
              setTimeSlotId(ids);
            }}
            onChangeSegmented={onChangeSex}
            onChangeInput={onChangeInput}
            onChangeGrade={onChangeGrade}
            createStudyRoom={onClick}
            onChangeStudyTime={onChangeStudyTime}
            default_time_slots_id={default_time_slots_id()}
            isCreateRoom={false}
            errorMessages={errorMessages}
            errorChange={errorChange}
            east_description={east_description}
            west_description={west_description}
            north_description={north_description}
            south_description={south_description}
            patch
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
