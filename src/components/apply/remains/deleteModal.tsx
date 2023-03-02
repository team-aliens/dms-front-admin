import { Button, Modal } from '@team-aliens/design-system';
import { Dispatch, SetStateAction } from 'react';
import { useDeleteRemain } from '@/hooks/useRemainApi';

interface PropsType {
  selectModalId: string;
  deleteModal: boolean;
  setDeleteModal: Dispatch<SetStateAction<boolean>>;
}
export default function DeleteModal({
  selectModalId,
  deleteModal,
  setDeleteModal,
}: PropsType) {
  const { mutate } = useDeleteRemain(selectModalId);
  const onClick = () => {
    mutate();
    setDeleteModal(false);
  };

  return (
    <div>
      {deleteModal ? (
        <Modal
          content="잔류 항목을 삭제하시겠습니까?"
          buttonList={[
            <Button
              kind="outline"
              color="gray"
              onClick={() => setDeleteModal(false)}
            >
              취소
            </Button>,
            <Button color="error" onClick={onClick}>
              확인
            </Button>,
          ]}
          close={() => setDeleteModal(false)}
        />
      ) : null}
    </div>
  );
}
