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

interface PropsType {
  initTitle?: string;
  initContent?: string;
  selectModalId: string;
  isRemainModal: boolean;
  setRemainModal: Dispatch<SetStateAction<boolean>>;
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
  isRemainModal,
  setRemainModal,
  kind,
}: PropsType) {
  const { onHandleChange, state, setState } = useForm<FormState>({
    title: '',
    content: '',
  });
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
      title: '',
      content: '',
    }));
  }, [isRemainModal]);
  useEffect(() => {
    setState((prev) => ({
      title: initTitle,
      content: initContent,
    }));
  }, [initTitle, initContent]);
  const onClick = () => {
    if (kind === 'create') {
      mutateCreateRemain();
    } else {
      mutateEditRemain();
    }
    setRemainModal(false);
  };
  return (
    <div>
      {isRemainModal ? (
        <Modal
          title={kind === 'create' ? '잔류 항목 추가' : '잔류 항목 수정'}
          inputList={[
            <_InputWrapper>
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
            <_InputWrapper>
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
              disabled={!(state.title && state.content)}
              onClick={onClick}
            >
              추가
            </Button>,
          ]}
          close={() => setRemainModal(false)}
        />
      ) : null}
    </div>
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
