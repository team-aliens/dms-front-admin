import { Modal, Button } from 'aliens-design-system-front';

interface PropsType {
  closeModal: () => void;
  deleteNotice: () => void;
}

export function DeleteNoticeConfirm({
  closeModal,
  deleteNotice,
}: PropsType) {
  return (
    <Modal
      header=""
      content="공지를 삭제하시겠습니까?"
      close={closeModal}
      buttonList={[
        <Button type="outline" color="gray" onClick={closeModal}>
          취소
        </Button>,
        <Button type="contained" color="error" onClick={deleteNotice}>
          삭제
        </Button>,
      ]}
    />
  );
}
