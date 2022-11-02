import { TextArea, Button } from 'aliens-design-system-front';
import { WithNavigatorBar } from '@/components/WithNavigatorBar';
import styled from 'styled-components';
import { FormEvent, useState } from 'react';

export const WriteNotice = () => {
  const [noticeContent, setNoticeContent] = useState();
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
            onChange={() => {}}
            value=""
            placeholder="제목을 입력해주세요."
          />
          <TextArea
            limit={1000}
            className="content"
            onChange={() => {}}
            value=""
            placeholder="내용을 입력해주세요."
          />
          <Button
            className="submitButton"
            type="contained"
            onClick={() => {}}
            color="primary"
            size="large"
          >
            게시하기
          </Button>
        </_Wrapper>
      </_BackgroundColor>
    </WithNavigatorBar>
  );
};

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
