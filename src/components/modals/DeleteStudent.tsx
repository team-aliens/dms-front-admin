import { Modal, Button } from '@team-aliens/design-system';
import { useDeleteStudent } from '@/hooks/useMangersApis';

interface PropsType {
  onClick: () => void;
  close: () => void;
}

export function DeleteStudentModal({ close, onClick }: PropsType) {
  return (
    <Modal
      content="학생을 삭제 하시겠습니까?"
      close={close}
      buttonList={[
        <Button onClick={close} kind="outline" color="gray">
          취소
        </Button>,
        <Button className="modalButton" color="error" onClick={onClick}>
          확인
        </Button>,
      ]}
    />
  );
}
