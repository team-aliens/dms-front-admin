import styled from 'styled-components';
import { Button, Trash } from '@team-aliens/design-system';
import { Dispatch, SetStateAction } from 'react';
import { SelectedModalType } from '@/context/modal';
import { ITimeSlots } from '@/apis/studyRooms/response';

interface PropsType {
  setClickId: Dispatch<SetStateAction<string>>;
  selectId: string;
  setSelectId: Dispatch<SetStateAction<string>>;
  prevId: string;
  selectModal: (selected: SelectedModalType) => void;
  timeSlot: ITimeSlots;
}
export default function TimeCard({
  setClickId,
  selectId,
  setSelectId,
  prevId,
  selectModal,
  timeSlot,
}: PropsType) {
  const onClickEdit = () => {
    setClickId(prevId);
    selectModal('EDIT_STUDY_ROOM_TIME');
  };
  const onClickDelete = () => {
    setClickId(prevId);
    selectModal('DELETE_STUDY_ROOM_TIME');
  };
  return (
    <_TimeWrapper isSelect={selectId === prevId}>
      <Button
        kind={selectId == prevId ? 'contained' : 'outline'}
        color={selectId === prevId ? 'primary' : 'gray'}
      >
        <p onClick={() => setSelectId(prevId)}>
          {timeSlot.start_time.slice(0, 2)}:{timeSlot.start_time.slice(3, 5)}시
          ~ {timeSlot.end_time.slice(0, 2)}:{timeSlot.end_time.slice(3, 5)}시{' '}
        </p>
        <Line className="line" />
        <div className="timeMenu">
          <div onClick={onClickEdit}>
            <EditIcon
              pathColor={selectId == prevId ? 'white' : '#999999'}
              color={selectId == prevId ? '#3D8AFF' : '#FFFFFF'}
            />
          </div>
          <div onClick={onClickDelete}>
            <Trash
              className="icon"
              colorKey={selectId === prevId ? 'gray1' : 'gray5'}
              size={28}
            />
          </div>
        </div>
      </Button>
    </_TimeWrapper>
  );
}

// TODO : 디자인 시스템 추가하기
function EditIcon({ color, pathColor }: { color: string; pathColor: string }) {
  return (
    <svg
      width="27"
      height="26"
      viewBox="0 0 27 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="13.1504" cy="13" r="13" fill={color} />
      <path
        d="M15.6495 11.4451L14.7053 10.5009L8.48589 16.7203V17.6645H9.43009L15.6495 11.4451ZM16.5937 10.5009L17.5379 9.55667L16.5937 8.61247L15.6495 9.55667L16.5937 10.5009ZM9.98299 19H7.15039V16.1667L16.1216 7.19551C16.2468 7.07032 16.4167 7 16.5937 7C16.7708 7 16.9406 7.07032 17.0658 7.19551L18.9549 9.08457C19.0801 9.2098 19.1504 9.37961 19.1504 9.55667C19.1504 9.73374 19.0801 9.90355 18.9549 10.0288L9.98299 19Z"
        fill={pathColor}
      />
    </svg>
  );
}
const _TimeWrapper = styled.div<{ isSelect: boolean }>`
  display: flex;
  position: relative;
  gap: 12px;
  height: auto;
  button {
    width: 150px;
    transition: all 0.3s;
    position: relative;
  }
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 16px;
    height: 100%;
  }
  button .timeMenu {
    display: flex;
    align-items: center;
    position: absolute;
    right: 16px;
    gap: 14px;
    opacity: 0;
    div {
      svg {
        padding: 2px;
        border-radius: 90px;
        background-color: ${({ isSelect }) =>
          isSelect ? '#3D8AFF' : '#FFFFFF'};
        fill: ${({ isSelect }) => (isSelect ? '#2B7FFF' : '#999999')};
      }
    }
  }
  button:hover {
    width: 240px;
    height: auto;
    .timeMenu {
      transition-delay: 0.15s;
      opacity: 1;
      svg {
        fill: white;
      }
    }
    .line {
      position: absolute;
      top: 25%;
      left: 58%;
      path {
        stroke: ${({ isSelect }) => (isSelect ? '#579AFF' : '#F3F3F3')};
      }
    }
  }
`;

const Line = ({ className }: { className: string }) => {
  return (
    <svg
      width="2"
      height="28"
      viewBox="0 0 2 28"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1.15039 1L1.15039 27" stroke={''} strokeLinecap="round" />
    </svg>
  );
};
