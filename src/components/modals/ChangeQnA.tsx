import { Button, Input, Modal } from '@team-aliens/design-system';
import { ChangeEvent } from 'react';

interface PropsType {
  close: () => void;
  question: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  answer: string;
  onClick: () => void;
}

export function ChangeQnA({
  close,
  question,
  onChange,
  answer,
  onClick,
}: PropsType) {
  return (
    <Modal
      close={close}
      buttonList={[
        <Button kind="contained" onClick={onClick}>
          저장
        </Button>,
      ]}
      title="새 확인 질문과 답변을 입력해주세요."
      inputList={[
        <Input
          name="question"
          value={question}
          onChange={onChange}
          placeholder="질문"
        />,
        <Input
          name="answer"
          value={answer}
          onChange={onChange}
          placeholder="답변"
        />,
      ]}
    />
  );
}
