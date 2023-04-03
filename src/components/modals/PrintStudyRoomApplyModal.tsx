import { Button, Modal, Text } from '@team-aliens/design-system';
import styled from 'styled-components';
import { ChangeEvent, ChangeEventHandler, useState } from 'react';
import {
  useAddStudyFile,
  useGetStudyExcel,
  useGetStudyExcelSample,
} from '@/apis/studyRooms';
import { useToast } from '@/hooks/useToast';

interface PropType {
  closeModal: () => void;
}
export default function PrintStudyRoomApplyModal({ closeModal }: PropType) {
  const [file, setFile] = useState<File>();
  const { toastDispatch } = useToast();
  const { mutateAsync: mutataeAddStudyFile } = useAddStudyFile(file);
  const { mutateAsync: mutateStudyExcelSample } = useGetStudyExcelSample();
  const { mutate: mutateGetStudyExcel } = useGetStudyExcel();
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files[0]) return;
    setFile(e.target.files[0]);
  };

  const handleExampleExcel = () => {
    mutateStudyExcelSample().catch(() => {
      toastDispatch({
        toastType: 'ERROR',
        actionType: 'APPEND_TOAST',
        message: '파일 다운로드에 실패했습니다.',
      });
    });
  };
  const addFile = () => {
    mutataeAddStudyFile()
      .then(() => {
        mutateGetStudyExcel();
        toastDispatch({
          toastType: 'SUCCESS',
          actionType: 'APPEND_TOAST',
          message: '파일이 전송되었습니다.',
        });
      })
      .catch(() => {
        toastDispatch({
          toastType: 'ERROR',
          actionType: 'APPEND_TOAST',
          message: '파일이 실패되었습니다.',
        });
      })
      .finally(() => {
        closeModal();
      });
  };
  return (
    <Modal
      title={'추가 정보 업로드'}
      buttonList={[
        <Button kind={'outline'} onClick={closeModal}>
          취소
        </Button>,
        <Button onClick={addFile}>확인</Button>,
      ]}
      close={closeModal}
    >
      <Text color="gray6">추가 정보를 업로드하고</Text>
      <Text color="gray6">확인 버튼을 눌러 자습실 신청 현황을 출력하세요</Text>
      <Button margin={[16, 0, 0, 0]} onClick={handleExampleExcel}>
        추가 정보 엑셀 예시
      </Button>
      <_FileUpload>
        <input
          type="file"
          style={{ display: 'none' }}
          id="file"
          onChange={onChange}
        />
        <label htmlFor="file">
          {!file ? (
            <>
              <Cloud />
              <button>내 컴퓨터</button>
              <p>여기에 파일을 끌어다 놓아주세요.</p>
            </>
          ) : (
            <div className="files">
              <div className="file">
                <FileIcon />
                <div>
                  <Text color={'gray5'}>{file.name}</Text>
                  <Text size={'bodyS'} color={'gray5'}>
                    {Math.round(file.size / 1000)}KB
                  </Text>
                </div>
              </div>
            </div>
          )}
        </label>
      </_FileUpload>
    </Modal>
  );
}

// TODO : 디자인 시스템 추가하기
function FileIcon() {
  return (
    <svg
      width="29"
      height="28"
      viewBox="0 0 29 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.7474 22.1666H9.91406C9.2724 22.1666 8.7229 21.938 8.26556 21.4806C7.80823 21.0233 7.57995 20.4742 7.58073 19.8333V3.49996C7.58073 2.85829 7.8094 2.30879 8.26673 1.85146C8.72406 1.39413 9.27318 1.16585 9.91406 1.16663H17.1182C17.4293 1.16663 17.7261 1.22496 18.0084 1.34163C18.2907 1.45829 18.5385 1.62357 18.7516 1.83746L24.4099 7.49579C24.6238 7.70968 24.7891 7.95779 24.9057 8.24013C25.0224 8.52246 25.0807 8.81879 25.0807 9.12913V19.8333C25.0807 20.475 24.8521 21.0245 24.3947 21.4818C23.9374 21.9391 23.3883 22.1674 22.7474 22.1666ZM5.2474 26.8333C4.60573 26.8333 4.05623 26.6046 3.5989 26.1473C3.14156 25.69 2.91329 25.1409 2.91406 24.5V9.33329C2.91406 9.00274 3.02606 8.72546 3.25006 8.50146C3.47406 8.27746 3.75095 8.16585 4.08073 8.16663C4.41129 8.16663 4.68856 8.27863 4.91256 8.50263C5.13656 8.72663 5.24818 9.00352 5.2474 9.33329V24.5H16.9141C17.2446 24.5 17.5219 24.612 17.7459 24.836C17.9699 25.06 18.0815 25.3368 18.0807 25.6666C18.0807 25.9972 17.9687 26.2745 17.7447 26.4985C17.5207 26.7225 17.2438 26.8341 16.9141 26.8333H5.2474ZM18.0807 9.33329H22.7474L16.9141 3.49996V8.16663C16.9141 8.49718 17.0261 8.77446 17.2501 8.99846C17.4741 9.22246 17.751 9.33407 18.0807 9.33329Z"
        fill="#DDDDDD"
      />
    </svg>
  );
}
function Cloud() {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M45.8327 83.3327H27.0827C20.7632 83.3327 15.3632 81.1452 10.8827 76.7702C6.40213 72.3952 4.16324 67.048 4.16602 60.7285C4.16602 55.3118 5.79796 50.4855 9.06185 46.2493C12.3257 42.0132 16.5966 39.3049 21.8744 38.1243C23.6105 31.7355 27.0827 26.5618 32.291 22.6035C37.4994 18.6452 43.4021 16.666 49.9994 16.666C58.1244 16.666 65.0174 19.4966 70.6785 25.1577C76.3396 30.8188 79.1688 37.7105 79.166 45.8327C83.9577 46.3882 87.9341 48.4549 91.0952 52.0327C94.2563 55.6105 95.8355 59.7938 95.8327 64.5827C95.8327 69.791 94.0091 74.2188 90.3619 77.866C86.7146 81.5132 82.2882 83.3355 77.0827 83.3327H54.166V53.541L60.8327 59.9993L66.666 54.166L49.9994 37.4993L33.3327 54.166L39.166 59.9993L45.8327 53.541V83.3327Z"
        fill="#DDDDDD"
      />
    </svg>
  );
}

const _FileUpload = styled.div`
  label {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    .files {
      display: flex;
      flex-direction: column;
      margin-top: 31px;
      gap: 16px;
      .file {
        background: #eeeeee;
        border-radius: 4px;
        width: 480px;
        height: 58px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-left: 13px;
        div {
          margin-left: 17px;
        }
      }
    }
    button {
      background: #3d8aff;
      border-radius: 2px;
      width: 96px;
      height: 38px;
      color: white;
      font-weight: 700;
    }
    p {
      font-weight: 400;
      font-size: 16px;
      color: #dddddd;
    }
  }
`;
