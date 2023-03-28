import { Modal, Button, DropDown, Arrow } from '@team-aliens/design-system';
import styled from 'styled-components';
import { useState, ReactNode } from 'react';
import {
  useCreateStudyTime,
  useGetStudyTimes,
  usePatchStudyTime,
} from '@/apis/studyRooms';
import { useForm } from '@/hooks/useForm';
import { TimePressButton } from './PressTimeButton';
import { CreateStudyTimeRequest } from '@/apis/studyRooms/request';
import { StydyTimeType } from '@/apis/studyRooms/response';

export interface ApplicationTime {
  startHour: string;
  startMin: string;
  endHour: string;
  endMin: string;
}

interface PropsType {
  close: () => void;
  createStudyRoom: () => void;
  onChangeDropdown: (type: keyof ApplicationTime, value: string) => void;
}

const hourToArray = Array(24)
  .fill(void 0)
  .map((_, idx) => `${idx < 10 ? '0' + String(idx) : String(idx)}`);

const minToArray = Array(60)
  .fill(void 0)
  .map((_, idx) => `${idx < 10 ? '0' + String(idx) : String(idx)}`);

export function SetUseTimeModal({
  close,
  createStudyRoom,
  onChangeDropdown,
  startHour,
  startMin,
  endHour,
  endMin,
}: ApplicationTime & PropsType) {
  const [addTime, setAddTime] = useState<boolean>(false);
  const { state, onHandleChange, setState } = useForm<CreateStudyTimeRequest>({
    start_time: '00:00',
    end_time: '00:00',
  });
  const [studyTimeDropDownItems, onChange] = useState<ApplicationTime>({
    startHour: '00',
    startMin: '00',
    endHour: '00',
    endMin: '00',
  });

  const createStudyTime = useCreateStudyTime(state, {
    onSuccess: () => {
      setAddTime(!addTime);
      refetch();
    },
  });
  const { data, refetch } = useGetStudyTimes();
  const [selectList, setSelectList] = useState<string[]>([]);

  const patchStudyTime = usePatchStudyTime(
    selectList[0],
    {
      start_time: state.start_time,
      end_time: state.end_time,
    },
    {
      onSuccess: () => {
        refetch();
      },
    },
  );

  const onChangeStudyTime = (type: string, value: string) => {
    onChange({
      ...studyTimeDropDownItems,
      [type]: value,
    });
    setState({
      ...state,
      start_time:
        studyTimeDropDownItems.startHour +
        ':' +
        studyTimeDropDownItems.startMin,
      end_time:
        studyTimeDropDownItems.endHour + ':' + studyTimeDropDownItems.endMin,
    });
  };

  return (
    <Modal
      title="자습실 사용 시간 설정"
      close={close}
      inputList={[
        <>
          <_Times>
            {data?.time_slots.map((time: StydyTimeType) => (
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
              {addTime
                ? '닫기'
                : selectList.length === 1
                ? '사용 시간 수정'
                : '사용 시간 추가'}
            </Button>
          </div>
          {addTime && (
            <_SetTime>
              <DropDown
                items={hourToArray}
                placeholder="00"
                onChange={(startHour) => {
                  onChangeDropdown('startHour', startHour);
                  onChangeStudyTime('startHour', startHour);
                }}
                width={80}
                value={startHour}
              />
              <p>:</p>
              <DropDown
                items={minToArray}
                placeholder="00"
                onChange={(startMin) => {
                  onChangeDropdown('startMin', startMin);
                  onChangeStudyTime('startMin', startMin);
                }}
                width={80}
                value={startMin}
              />
              <p className="to">~</p>
              <DropDown
                items={hourToArray}
                placeholder="00"
                onChange={(endHour) => {
                  onChangeDropdown('endHour', endHour);
                  onChangeStudyTime('endHour', endHour);
                }}
                width={80}
                value={endHour}
              />
              <p>:</p>
              <DropDown
                items={minToArray}
                placeholder="00"
                onChange={(endMin) => {
                  onChangeDropdown('endMin', endMin);
                  onChangeStudyTime('endMin', endMin);
                }}
                width={80}
                value={endMin}
                className="hi"
              />
              <Button
                color="gray"
                onClick={
                  selectList.length === 1
                    ? patchStudyTime.mutate
                    : createStudyTime.mutate
                }
              >
                {selectList.length === 1 ? '시간대 수정' : '시간대 추가'}
              </Button>
            </_SetTime>
          )}
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
  overflow-x: auto;
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
  justify-content: center;
  align-items: center;
  > p {
    margin: 0 8px;
    font-weight: 700;
  }
  > .to {
    margin: 0 20px;
  }
  > .hi {
    margin: 0 10px;
  }
`;
