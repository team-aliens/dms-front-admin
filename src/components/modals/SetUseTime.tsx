import { Modal, Button, DropDown } from '@team-aliens/design-system';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import {
  useCreateStudyTime,
  useGetStudyTimes,
  usePatchStudyTime,
} from '@/apis/studyRooms';
import { useDropDown } from '@/hooks/useDropDown';
import { TimePressButton } from './PressTimeButton';
import { StydyTimeType } from '@/apis/studyRooms/response';
import { TimePicker } from './TimePicker';

interface PropsType {
  close: () => void;
  createStudyRoom: () => void;
  onChangeStudyTime: (times_id: string[]) => void;
}

export function SetUseTimeModal({
  close,
  createStudyRoom,
  onChangeStudyTime,
}: PropsType) {
  const [selectList, setSelectList] = useState<string[]>([]);
  const [addTime, setAddTime] = useState<boolean>(false);
  const [isFetch, setIsFetch] = useState<boolean>(false);
  const { onDropDownChange: onChangeStartHour, sort: startHourState } =
    useDropDown<string>('');
  const { onDropDownChange: onChangeStartMin, sort: startMinState } =
    useDropDown<string>('');
  const { onDropDownChange: onChangeEndHour, sort: endHourState } =
    useDropDown<string>('');
  const { onDropDownChange: onChangeEndMin, sort: endMinState } =
    useDropDown<string>('');

  //이용시간 get API
  const { data, refetch } = useGetStudyTimes();

  //이용시간 선택
  useEffect(() => {
    onChangeStudyTime(selectList);
    if (selectList.length === 1) {
      setIsFetch(true);
    } else {
      setIsFetch(false);
      resetState();
    }
  }, [selectList]);

  //이용시간 추가 API
  const createStudyTime = useCreateStudyTime(
    {
      start_time: String(
        (startHourState || '00') + ':' + (startMinState || '00'),
      ),
      end_time: String((endHourState || '00') + ':' + (endMinState || '00')),
    },
    {
      onSuccess: () => {
        setAddTime(!addTime);
        refetch();
        resetState();
      },
    },
  );

  //이용시간 수정 API
  const patchStudyTime = usePatchStudyTime(
    selectList[0],
    {
      start_time: String(
        (startHourState || '00') + ':' + (startMinState || '00'),
      ),
      end_time: String((endHourState || '00') + ':' + (endMinState || '00')),
    },
    {
      onSuccess: () => {
        refetch();
        resetState();
      },
    },
  );

  //드롭다운 state 값 초기화
  const resetState = () => {
    onChangeStartHour('');
    onChangeStartMin('');
    onChangeEndHour('');
    onChangeEndMin('');
  };

  return (
    <Modal
      title="자습실 사용 시간 설정"
      close={close}
      inputList={[
        <>
          <_Times>
            {data?.time_slots.map((time: StydyTimeType, index) => (
              <TimePressButton
                setSelect={setSelectList}
                select={selectList}
                timeSlotId={time.id}
                start_time={time.start_time}
                end_time={time.end_time}
              />
            ))}
          </_Times>
          <div>
            <Button
              kind="text"
              color="gray"
              size="default"
              onClick={() => setAddTime(!addTime)}
            >
              {addTime ? '닫기' : isFetch ? '사용 시간 수정' : '사용 시간 추가'}
            </Button>
          </div>
          <_SetTime
            style={addTime ? { height: '47px', overflowY: 'visible' } : {}}
          >
            <TimePicker
              timeState={{
                startHourState: startHourState,
                startMinState: startMinState,
                endHourState: endHourState,
                endMinState: endMinState,
              }}
              onChangeState={{
                onChangeSH: onChangeStartHour,
                onChangeSM: onChangeStartMin,
                onChangeEH: onChangeEndHour,
                onChangeEM: onChangeEndMin,
              }}
            />
            <Button
              color="gray"
              onClick={() => {
                isFetch ? patchStudyTime.mutate() : createStudyTime.mutate();
              }}
            >
              {isFetch ? '시간대 수정' : '시간대 추가'}
            </Button>
          </_SetTime>
        </>,
      ]}
      buttonList={[
        <Button
          disabled={selectList.length !== 0 ? false : true}
          onClick={createStudyRoom}
        >
          생성
        </Button>,
      ]}
    />
  );
}

const _Times = styled.div`
  overflow-x: scroll;
  white-space: nowrap;
  > button {
    display: inline-block;
    margin-right: 10px;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;

const _SetTime = styled.div`
  display: flex;
  align-items: center;
  overflow-y: hidden;
  height: 0;
  transition: all 0.2s;
  > p {
    margin: 0 8px;
    font-weight: 700;
  }
  > button {
    margin-left: 10px;
  }
`;
