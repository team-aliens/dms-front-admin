import { TextArea, Button } from '@team-aliens/design-system';
import styled from 'styled-components';
import { ChangeEvent, FormEvent } from 'react';
import { WithNavigatorBar } from '@/components/WithNavigatorBar';
import { BreadCrumb } from '@team-aliens/design-system';
import { useLocation } from 'react-router-dom';

interface Props {
  title: string;
  content: string;
  onClick: () => void;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  pathToKorean: any;
}

export function WriteNotice({
  title,
  content,
  onClick,
  onChange,
  pathToKorean,
}: Props) {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  console.log(useLocation().pathname.split('/'));
  return (
    <WithNavigatorBar>
      <_BackgroundColor>
        <_Wrapper onSubmit={onSubmit}>
          <BreadCrumb left={366} pathToKorean={pathToKorean} />
          <TextArea
            limit={100}
            height={46}
            className="title"
            onChange={onChange}
            value={title}
            placeholder="제목을 입력해주세요."
            name="title"
          />
          <TextArea
            limit={1000}
            height={240}
            className="content"
            onChange={onChange}
            value={content}
            placeholder="내용을 입력해주세요."
            name="content"
          />
          <Button
            className="submitButton"
            kind="contained"
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
  margin-top: 160px;
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
