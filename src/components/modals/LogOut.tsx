import { Button, Modal } from '@team-aliens/design-system';

interface PropsType {
  closeModal: () => void;
}

export function LogOutModal({ closeModal }: PropsType) {
  return (
    <Modal
      close={closeModal}
      title="로그아웃 재확인"
      content="로그아웃 하시겠습니까?"
      buttonList={[
        <Button onClick={closeModal} kind="outline" color="gray">
          취소
        </Button>,
        <Button kind="contained" color="error">
          확인
        </Button>,
      ]}
    />
  );
}
