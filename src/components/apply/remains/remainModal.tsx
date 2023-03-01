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

interface PropsType {
  initTitle?: string;
  initContent?: string;
  selectModalId: string;
  remainModal: boolean;
  setRemainModal: Dispatch<SetStateAction<boolean>>;
  kind: 'create' | 'edit';
}
export default function RemainModal({
  initTitle,
  initContent,
  selectModalId,
  remainModal,
  setRemainModal,
  kind,
}: PropsType) {
  const [title, setTitle] = useState<string>(kind === 'edit' ? initTitle : '');
  const [content, setContent] = useState<string>(
    kind === 'edit' ? initContent : '',
  );
  const { mutate: mutateCreateRemain } = useCreateRemain({
    title,
    description: content,
  });
  const { mutate: mutateEditRemain } = useEditRemain(selectModalId, {
    title,
    description: content,
  });

  useEffect(() => {
    setTitle(initTitle);
    setContent(initContent);
  }, [initTitle, initContent]);
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
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
      {remainModal ? (
        <Modal
          title={kind === 'create' ? '잔류 항목 추가' : '잔류 항목 수정'}
          inputList={[
            <_InputWrapper>
              <Input
                onChange={onChangeTitle}
                name="제목"
                label="제목"
                value={title}
                placeholder="ex) 금요 외박"
                limit={30}
              />
              <_TextLength>({title.length}/30)</_TextLength>
            </_InputWrapper>,
            <_InputWrapper>
              <_TextareaText>내용</_TextareaText>
              <TextArea
                onChange={onChangeContent}
                name="내용"
                value={content}
                height={176}
              />
              <_TextLength>({content.length}/200)</_TextLength>
            </_InputWrapper>,
          ]}
          buttonList={[
            <Button disabled={!(title && content)} onClick={onClick}>
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
