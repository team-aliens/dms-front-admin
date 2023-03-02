import { Button, Modal, Text } from '@team-aliens/design-system';
import styled from 'styled-components';
import { useState } from 'react';
import { useStudentAccountIssuance } from '@/hooks/useStudentRegistrationExcel';
import { download } from '@/utils/exel';

interface PropsType {
  closeModal: () => void;
}

export const StudentRegistrationExcel = ({ closeModal }: PropsType) => {
  const [uploadedFile, setUplodaedFile] = useState(null);
  const studentAccount = useStudentAccountIssuance(uploadedFile, closeModal);

  const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUplodaedFile(e.target.files[0]);
  };

  return (
    <Modal
      close={closeModal}
      title="학생 등록 엑셀 다운로드"
      buttonList={[
        <Button kind="outline" onClick={closeModal}>
          취소
        </Button>,
        <Button
          onClick={() => {
            studentAccount.mutate();
          }}
        >
          확인
        </Button>,
      ]}
    >
      <Button onClick={download}>엑셀 양식 다운로드</Button>
      <_Text margin={[15, 0, 14, 0]}>
        학생을 등록하기 위해서 엑셀을 다운로드 받은 후 정보를 기입한 엑셀을
        업로드 해주세요.
      </_Text>
      {uploadedFile ? (
        <>
          <_UploadedFile htmlFor="input-file">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.1668 22.167H9.3335C8.69183 22.167 8.14233 21.9383 7.685 21.481C7.22766 21.0237 6.99939 20.4746 7.00016 19.8337V3.50033C7.00016 2.85866 7.22883 2.30916 7.68616 1.85183C8.1435 1.39449 8.69261 1.16622 9.3335 1.16699H16.5377C16.8488 1.16699 17.1455 1.22533 17.4278 1.34199C17.7102 1.45866 17.9579 1.62394 18.171 1.83783L23.8293 7.49616C24.0432 7.71005 24.2085 7.95816 24.3252 8.24049C24.4418 8.52283 24.5002 8.81916 24.5002 9.12949V19.8337C24.5002 20.4753 24.2715 21.0248 23.8142 21.4822C23.3568 21.9395 22.8077 22.1678 22.1668 22.167ZM4.66683 26.8337C4.02516 26.8337 3.47566 26.605 3.01833 26.1477C2.561 25.6903 2.33272 25.1412 2.3335 24.5003V9.33366C2.3335 9.00311 2.4455 8.72583 2.6695 8.50183C2.8935 8.27783 3.17039 8.16622 3.50016 8.16699C3.83072 8.16699 4.108 8.27899 4.332 8.50299C4.556 8.72699 4.66761 9.00388 4.66683 9.33366V24.5003H16.3335C16.6641 24.5003 16.9413 24.6123 17.1653 24.8363C17.3893 25.0603 17.5009 25.3372 17.5002 25.667C17.5002 25.9975 17.3882 26.2748 17.1642 26.4988C16.9402 26.7228 16.6633 26.8344 16.3335 26.8337H4.66683ZM17.5002 9.33366H22.1668L16.3335 3.50033V8.16699C16.3335 8.49755 16.4455 8.77483 16.6695 8.99883C16.8935 9.22283 17.1704 9.33444 17.5002 9.33366Z"
                fill="#DDDDDD"
              />
            </svg>
            <div>
              <Text color="gray5" size="bodyS">
                {uploadedFile.name}
              </Text>
              <Text color="gray5" size="overlineM">
                {uploadedFile.size / 1000}KB
              </Text>
            </div>
          </_UploadedFile>
          <_Upload
            id="input-file"
            type="file"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            onChange={onFileUpload}
          />
        </>
      ) : (
        <>
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
        </>
      )}
    </Modal>
  );
};

const _UploadedFile = styled.label`
  background: #eeeeee;
  border-radius: 4px;
  height: 58px;
  display: flex;
  align-items: center;
  gap: 14px;
  padding-left: 13px;
  margin-bottom: 158px;
`;

const _Load = styled.label`
  padding: 6px 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  margin-bottom: 62px;
`;

const _Upload = styled.input`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  display: none;
`;

const _Text = styled(Text)`
  width: 324px;
`;
