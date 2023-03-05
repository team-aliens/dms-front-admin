import { Button, Modal } from '@team-aliens/design-system';
import { useDeleteRemain } from '@/hooks/useRemainApi';
import { useModal } from '@/hooks/useModal';

interface PropsType {
  selectModalId: string;
}
export default function DeleteModal({ selectModalId }: PropsType) {
  const { mutate } = useDeleteRemain(selectModalId);
  const { closeModal } = useModal();
  const onClick = () => {
    mutate();
    closeModal();
  };

  return (
    <Modal
      content="잔류 항목을 삭제하시겠습니까?"
      buttonList={[
        <Button key={'cancel'} kind="outline" color="gray" onClick={closeModal}>
          취소
        </Button>,
        <Button key={'okay'} color="error" onClick={onClick}>
          확인
        </Button>,
      ]}
      close={closeModal}
    />
  );
}
