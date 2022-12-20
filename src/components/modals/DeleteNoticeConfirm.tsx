import { Modal, Button } from '@team-aliens/design-system';

interface PropsType {
  closeModal: () => void;
  deleteNotice: () => void;
}

export function DeleteNoticeConfirm({ closeModal, deleteNotice }: PropsType) {
  return (
    <Modal
      title=""
      content="공지를 삭제하시겠습니까?"
      close={closeModal}
      buttonList={[
        <Button kind="outline" color="gray" onClick={closeModal}>
          취소
        </Button>,
        <Button kind="contained" color="error" onClick={deleteNotice}>
          삭제
        </Button>,
      ]}
    />
  );
}
