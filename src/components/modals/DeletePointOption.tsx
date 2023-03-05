import { useModal } from '@/hooks/useModal';
import { Button, Modal } from '@team-aliens/design-system';
import { Dispatch, SetStateAction } from 'react';

interface PropsType {
  setSelectedOption?: Dispatch<SetStateAction<string>>;
  closeModal: () => void;
  onClick: () => void;
}

export function DeletePointOptionModal({
  closeModal,
  onClick,
  setSelectedOption,
}: PropsType) {
  const { selectModal } = useModal();
  const backToDeletePointOptionModal = () => {
    selectModal('POINT_OPTIONS');
    setSelectedOption('');
  };

  return (
    <Modal
      close={closeModal}
      content="상/벌점 항목을 삭제 하시겠습니까?"
      buttonList={[
        <Button
          onClick={backToDeletePointOptionModal}
          kind="outline"
          color="gray"
        >
          취소
        </Button>,
        <Button onClick={onClick} kind="contained" color="error">
          확인
        </Button>,
      ]}
    />
  );
}
