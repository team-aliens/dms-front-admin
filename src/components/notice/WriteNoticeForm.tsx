import { TextArea, Button } from 'aliens-design-system-front';
import styled from 'styled-components';
import { ChangeEvent, FormEvent } from 'react';
import { WithNavigatorBar } from '@/components/WithNavigatorBar';

interface Props {
  title: string;
  content: string;
  onClick: () => void;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export function WriteNotice({
  title, content, onClick, onChange,
}: Props) {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <WithNavigatorBar>
      <_BackgroundColor>
        <_Wrapper onSubmit={onSubmit}>
          <_Path />
          <TextArea
            limit={100}
            className="title"
            onChange={onChange}
            value={title}
            placeholder="제목을 입력해주세요."
            name="title"
          />
          <TextArea
            limit={1000}
            className="content"
            onChange={onChange}
            value={content}
            placeholder="내용을 입력해주세요."
            name="content"
          />
          <Button
            className="submitButton"
            type="contained"
            onClick={onClick}
            color="primary"
            size="large"
            disabled={!(title && content && true)}
          >
            게시하기
          </Button>
        </_Wrapper>
      </_BackgroundColor>
    </WithNavigatorBar>
  );
}

const _BackgroundColor = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.gray2};
`;

const _Wrapper = styled.form`
  margin: 0 auto;
  width: 1030px;
  > .title {
    margin-top: 52px;
  }
  > .content {
    margin-top: 40px;
  }
  > .submitButton {
    margin-top: 60px;
  }
`;

const _Path = styled.div`
  height: 22px;
  width: 180px;
  background-color: ${({ theme }) => theme.color.gray5};
  margin-top: 86px;
`;
