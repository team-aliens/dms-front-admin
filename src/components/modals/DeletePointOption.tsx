import { useModal } from '@/hooks/useModal';
import { Button, Modal } from '@team-aliens/design-system';

interface PropsType {
  closeModal: () => void;
  onClick: () => void;
}

export function DeletePointListModal({ closeModal, onClick }: PropsType) {
  const { selectModal } = useModal();
  const confirm = () => {
    onClick();
    closeModal();
  };

  return (
    <Modal
      close={closeModal}
      content="상/벌점 항목을 삭제 하시겠습니까?"
      buttonList={[
        <Button
          onClick={() => {
            closeModal();
            selectModal('DELETE_POINT_OPTION');
          }}
          kind="outline"
          color="gray"
        >
          취소
        </Button>,
        <Button onClick={confirm} kind="contained" color="error">
          확인
        </Button>,
      ]}
    />
  );
}
