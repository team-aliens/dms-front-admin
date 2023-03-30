import { useModal } from '@/hooks/useModal';
import { Button, Modal } from '@team-aliens/design-system';
import { Dispatch, SetStateAction } from 'react';

interface PropsType {
  setSelectedOption?: Dispatch<SetStateAction<string>>;
  closeModal: () => void;
  onClick: () => void;
  tagModal: string;
}

export function DeleteTagModal({
  closeModal,
  onClick,
  setSelectedOption,
  tagModal,
}: PropsType) {
  const { selectModal } = useModal();
  const backToDeleteTagModal = () => {
    selectModal(
      tagModal === 'GIVE_TAG_OPTIONS' ? 'GIVE_TAG_OPTIONS' : 'VIEW_TAG_OPTIONS',
    );
    setSelectedOption('');
  };

  return (
    <Modal
      close={closeModal}
      content="태그를 삭제 하시겠습니까?"
      buttonList={[
        <Button onClick={backToDeleteTagModal} kind="outline" color="gray">
          취소
        </Button>,
        <Button onClick={onClick} kind="contained" color="error">
          확인
        </Button>,
      ]}
    />
  );
}
