import { Dispatch, SetStateAction } from 'react';
import { Modal, Button, Input } from '@team-aliens/design-system';
import styled from 'styled-components';
import { useForm } from '@/hooks/useForm';

interface PropsType {
  close: () => void;
  onClick?: () => void;
}

export function DeleteStudyRoomTimeModal({ close, onClick }: PropsType) {
  return (
    <Modal
      content="해당 시간을 삭제 하시겠습니까?"
      close={close}
      buttonList={[
        <Button onClick={close} kind="outline" color="gray">
          취소
        </Button>,
        <Button color="error" onClick={onClick}>
          확인
        </Button>,
      ]}
    />
  );
}
