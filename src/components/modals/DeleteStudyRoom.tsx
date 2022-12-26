import { Modal, Button } from '@team-aliens/design-system';

interface PropsType {
  close: () => void;
  deleteStudyRoom: () => void;
}

export function DeleteStudyRoom({ close, deleteStudyRoom }: PropsType) {
  return (
    <Modal
      content={'삭제된 자습실은 복구가 불가능합니다.\n해당 자습실을 삭제하시겠습니까?'}
      buttonList={[
        <Button kind="outline" color="primary" onClick={close}>
          취소
        </Button>,
        <Button kind="contained" color="error" onClick={deleteStudyRoom}>
          삭제
        </Button>,
      ]}
      close={close}
    />
  );
}
