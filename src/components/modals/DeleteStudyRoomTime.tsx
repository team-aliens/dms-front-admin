import { Modal, Button } from '@team-aliens/design-system';
import { useDeleteTimeSlots } from '@/apis/studyRooms';
import { useToast } from '@/hooks/useToast';

interface PropsType {
  closeModal: () => void;
  timeSlotId: string;
}

export function DeleteStudyRoomTimeModal({
  closeModal,
  timeSlotId,
}: PropsType) {
  const { mutateAsync } = useDeleteTimeSlots({
    path: {
      time_slot_id: timeSlotId,
    },
  });

  const { toastDispatch } = useToast();

  const onClick = () => {
    mutateAsync()
      .then(() => {
        toastDispatch({
          toastType: 'SUCCESS',
          actionType: 'APPEND_TOAST',
          message: '자습실 이용시간이 삭제되었습니다.',
        });
        closeModal();
      })
      .catch(() => {
        toastDispatch({
          toastType: 'ERROR',
          actionType: 'APPEND_TOAST',
          message: '자습실 이용시간 삭제를 실패했습니다.',
        });
      });
  };
  return (
    <Modal
      content="해당 시간을 삭제 하시겠습니까?"
      close={closeModal}
      buttonList={[
        <Button onClick={closeModal} color="gray">
          취소
        </Button>,
        <Button color="error" onClick={onClick}>
          확인
        </Button>,
      ]}
    />
  );
}
