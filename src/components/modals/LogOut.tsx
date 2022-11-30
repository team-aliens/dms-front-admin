import { Button, Modal } from 'aliens-design-system-front';

interface PropsType {
  closeModal: () => void;
}

export function LogOutModal({ closeModal }: PropsType) {
  return (
    <Modal
      close={closeModal}
      header="로그아웃 재확인"
      content="로그아웃 하시겠습니까?"
      buttonList={[
        <Button onClick={closeModal} type="outline" color="gray">
          취소
        </Button>,
        <Button type="contained" color="error">
          확인
        </Button>,
      ]}
    />
  );
}
