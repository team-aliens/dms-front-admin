import { Button, MegaPhone, Text, Trash } from '@team-aliens/design-system';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useModal } from '@/hooks/useModal';
import {
  ApplicationTime,
  SetApplicationTimeModal,
} from '@/components/modals/SetApplicationTime';
import { pagePath } from '@/utils/pagePath';
import { useState } from 'react';
import { useGetStudyExcel } from '@/apis/studyRooms';
import { useToast } from '@/hooks/useToast';

interface PropsType {
  setApplicationTime: () => void;
  onChangeDropdown: (type: keyof ApplicationTime, value: string) => void;
}

export function StudyListOptions({
  setApplicationTime,
  onChangeDropdown,
  startHour,
  startMin,
  endHour,
  endMin,
}: ApplicationTime & PropsType) {
  const [fileToggle, setFileToggle] = useState(false);
  const { selectModal, modalState, closeModal } = useModal();
  const { mutateAsync } = useGetStudyExcel();
  const { toastDispatch } = useToast();

  const toggleFileButton = () => {
    setFileToggle((prev) => !prev);
  };

  const printExcel = () => {
    mutateAsync()
      .catch(() =>
        toastDispatch({
          toastType: 'ERROR',
          actionType: 'APPEND_TOAST',
          message: '신청 내역 출력 오류',
        }),
      )
      .finally(() => {
        closeModal();
      });
  };
  return (
    <>
      {modalState.selectedModal === 'APPLICATION_TIME' && (
        <SetApplicationTimeModal
          onChangeDropdown={onChangeDropdown}
          close={closeModal}
          startHour={startHour}
          startMin={startMin}
          endHour={endHour}
          endMin={endMin}
          setApplicationTime={setApplicationTime}
        />
      )}
      <_Wrapper>
        <_ApplyAbleTime>
          <MegaPhone fill={false} colorKey="primary" />
          <Text margin={['left', 20]} color="gray9" size="bodyS">
            {/* 자습실 신청 시간을 입력해주세요. */}
            자습실 신청 시간은 {startHour}:{startMin} ~ {endHour}:{endMin}
            까지 입니다.
          </Text>
          <Button
            kind="text"
            color="primary"
            margin={['left', 'auto']}
            onClick={() => selectModal('APPLICATION_TIME')}
          >
            수정
          </Button>
        </_ApplyAbleTime>
        <div className="buttonWrapper">
          <Button Icon={<FileIcon />} onClick={toggleFileButton}>
            파일
          </Button>
          {fileToggle && (
            <_FileOptions>
              <div className="fileOption" onClick={printExcel}>
                신청 내역 출력
              </div>
              <Line />
              <div
                className="fileOption"
                onClick={() => selectModal('PRINT_STUDY_ROOM_APPLY')}
              >
                추가 정보 업로드
              </div>
            </_FileOptions>
          )}
          <_CreateBtn to={pagePath.apply.studyRoom.create}>
            <Button kind="outline" color="primary">
              자습실 생성
            </Button>
          </_CreateBtn>
        </div>
      </_Wrapper>
    </>
  );
}

// TODO : 디자인 시스템 추가하기
function FileIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.7647 8.75H17.1111C17.602 8.75 18 9.14797 18 9.63889V14.8317V14.8317C18 15.8911 17.1411 16.75 16.0817 16.75H4M2 4.13889V15C2 15.9665 2.7835 16.75 3.75 16.75V16.75C4.7165 16.75 5.5 15.9665 5.5 15V9.63889C5.5 9.14797 5.89797 8.75 6.38889 8.75H16.2222V6.64869C16.2222 6.15777 15.8243 5.7598 15.3333 5.7598H9.47712L8.11883 3.65664C7.9551 3.40313 7.67392 3.25 7.37213 3.25H2.88889C2.39797 3.25 2 3.64797 2 4.13889Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
const Line = () => {
  return (
    <svg
      width="112"
      height="2"
      viewBox="0 0 112 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0.5 1H111" stroke="#EEEEEE" stroke-linecap="round" />
    </svg>
  );
};
const _Wrapper = styled.div`
  display: flex;
  .buttonWrapper {
    display: flex;
    margin-left: auto;
    gap: 12px;
    position: relative;
  }
`;

const _ApplyAbleTime = styled.div`
  display: flex;
  align-items: center;
  min-width: 400px;
  height: 50px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.gray1};
  padding-left: 20px;
  box-shadow: 0 1px 20px rgba(238, 238, 238, 0.8);
  > button {
    min-width: 58px;
  }
`;

const _CreateBtn = styled(Link)``;
const _FileOptions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  width: 132px;
  height: 92px;
  border: 1px solid #eeeeee;
  box-shadow: 0px 1px 20px rgba(238, 238, 238, 0.8);
  border-radius: 4px;
  top: 60px;
  left: -50px;
  background-color: white;
  z-index: 2;
  .fileOption {
    display: flex;
    align-items: center;
    height: 100%;
    font-weight: 400;
    font-size: 12px;
    color: #555555;
    cursor: pointer;
  }
`;
