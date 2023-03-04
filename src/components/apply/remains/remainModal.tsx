import { Button, Input, Modal, TextArea } from '@team-aliens/design-system';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import { useCreateRemain, useEditRemain } from '@/hooks/useRemainApi';
import { useForm } from '@/hooks/useForm';
import { useModal } from '@/hooks/useModal';

interface PropsType {
  initTitle?: string;
  initContent?: string;
  selectModalId: string;
  kind: 'create' | 'edit';
}

interface FormState {
  title: string;
  content: string;
}
export default function RemainModal({
  initTitle,
  initContent,
  selectModalId,
  kind,
}: PropsType) {
  const { onHandleChange, state, setState } = useForm<FormState>({
    title: '',
    content: '',
  });
  const { closeModal } = useModal();
  const { mutate: mutateCreateRemain } = useCreateRemain({
    title: state.title,
    description: state.content,
  });
  const { mutate: mutateEditRemain } = useEditRemain(selectModalId, {
    title: state.title,
    description: state.content,
  });
  useEffect(() => {
    setState((prev) => ({
      title: kind === 'edit' ? initTitle : '',
      content: kind === 'edit' ? initContent : '',
    }));
  }, [selectModalId]);
  const onClick = () => {
    if (kind === 'create') {
      mutateCreateRemain();
    } else {
      mutateEditRemain();
    }
    closeModal();
  };
  const onCloseModal = () => {
    setState({
      title: '',
      content: '',
    });
    closeModal();
  };
  return (
    <Modal
      title={kind === 'create' ? '잔류 항목 추가' : '잔류 항목 수정'}
      inputList={[
        <_InputWrapper key={'title'}>
          <Input
            onChange={onHandleChange}
            name={'title'}
            label="제목"
            value={state.title}
            placeholder="ex) 금요 외박"
            type="text"
            limit={30}
          />
          <_TextLength>({state.title.length}/30)</_TextLength>
        </_InputWrapper>,
        <_InputWrapper key={'content'}>
          <_TextareaText>내용</_TextareaText>
          <TextArea
            onChange={onHandleChange}
            name="content"
            value={state.content}
            height={176}
            limit={200}
          />
        </_InputWrapper>,
      ]}
      buttonList={[
        <Button
          key={'add'}
          disabled={!(state.title && state.content)}
          onClick={onClick}
        >
          추가
        </Button>,
      ]}
      close={onCloseModal}
    />
  );
}
const _InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const _TextareaText = styled.div`
  font-weight: 400;
  font-size: 16px;
  color: #555555;
  margin-left: 6px;
`;
const _TextLength = styled.div`
  align-self: flex-end;
  font-size: 12px;
  font-weight: 400;
  color: #999999;
`;
