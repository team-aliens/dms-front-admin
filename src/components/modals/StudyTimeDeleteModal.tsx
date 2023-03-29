import { Button, Modal } from '@team-aliens/design-system';

interface PropsType {
  closeModal: () => void;
}
export default function StudyTimeDeleteModal({ closeModal }: PropsType) {
  return (
    <Modal
      title="해당 시간을 삭제하겠습니까?"
      close={closeModal}
      buttonList={[<Button>취소</Button>, <Button color="error">확인</Button>]}
    ></Modal>
  );
}
