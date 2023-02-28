import { Button, Modal, Text } from '@team-aliens/design-system';
import styled from 'styled-components';
import { useState, useRef } from 'react';
import { useStudentAccountIssuance } from '@/hooks/useStudentRegistrationExcel';
import { download } from '@/utils/exel';

interface PropsType {
  closeModal: () => void;
}

let file = new FormData();
export const StudentRegistrationExcel = ({ closeModal }: PropsType) => {
  const studentAccount = useStudentAccountIssuance(file);

  const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    file.append('file', e.target.files[0]);
  };

  return (
    <Modal
      close={closeModal}
      title="학생 등록 엑셀 다운로드"
      content="학생을 등록하기 위해서 엑셀을 다운로드 받은 후 정보를 기입한 엑셀을 업로드 해주세요."
      buttonList={[
        <Button kind="outline" onClick={closeModal}>
          취소
        </Button>,
        <Button
          onClick={() => {
            studentAccount.mutate();
            closeModal();
          }}
        >
          확인
        </Button>,
      ]}
    >
      <Button onClick={download}>엑셀 양식 다운로드</Button>
      <_Load htmlFor="input-file">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
          <path
            d="M45.8327 83.3327H27.0827C20.7632 83.3327 15.3632 81.1452 10.8827 76.7702C6.40213 72.3952 4.16324 67.048 4.16602 60.7285C4.16602 55.3118 5.79796 50.4855 9.06185 46.2493C12.3257 42.0132 16.5966 39.3049 21.8744 38.1243C23.6105 31.7355 27.0827 26.5618 32.291 22.6035C37.4994 18.6452 43.4021 16.666 49.9994 16.666C58.1244 16.666 65.0174 19.4966 70.6785 25.1577C76.3396 30.8188 79.1688 37.7105 79.166 45.8327C83.9577 46.3882 87.9341 48.4549 91.0952 52.0327C94.2563 55.6105 95.8355 59.7938 95.8327 64.5827C95.8327 69.791 94.0091 74.2188 90.3619 77.866C86.7146 81.5132 82.2882 83.3355 77.0827 83.3327H54.166V53.541L60.8327 59.9993L66.666 54.166L49.9994 37.4993L33.3327 54.166L39.166 59.9993L45.8327 53.541V83.3327Z"
            fill="#DDDDDD"
          />
        </svg>
        <Text color="gray4">여기에 파일을 끌어다 놓아주세요.</Text>
      </_Load>
      <_Upload
        id="input-file"
        type="file"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        onChange={onFileUpload}
      />
    </Modal>
  );
};

const _Load = styled.label`
  padding: 6px 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  border-radius: 4px;
  color: white;
  cursor: pointer;
`;

const _Upload = styled.input`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  display: none;
`;
