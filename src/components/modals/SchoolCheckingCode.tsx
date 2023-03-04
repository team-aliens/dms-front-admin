import { Button, Modal } from '@team-aliens/design-system';

interface PropsType {
  closeModal: () => void;
  onClick: () => void;
}

export function SchoolCheckingCodeModal({ closeModal, onClick }: PropsType) {
  const confirm = () => {
    onClick();
    closeModal();
  };

  return (
    <Modal
      close={closeModal}
      content="확인코드를 새로 발급하시겠습니까?"
      buttonList={[
        <Button onClick={closeModal} kind="outline" color="gray">
          취소
        </Button>,
        <Button onClick={confirm} kind="contained" color="error">
          확인
        </Button>,
      ]}
    />
  );
}