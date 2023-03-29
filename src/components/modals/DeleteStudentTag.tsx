import { Modal, Button } from '@team-aliens/design-system';

interface PropsType {
  onClick: () => void;
  close: () => void;
}

export function DeleteStudentTagModal({ close, onClick }: PropsType) {
  return (
    <Modal
      content="해당 학생 태그를 삭제 하시겠습니까?"
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
