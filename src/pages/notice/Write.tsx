import { TextArea, Button } from 'aliens-design-system-front';
import styled from 'styled-components';
import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { WithNavigatorBar } from '@/components/WithNavigatorBar';
import { WriteNoticeRequest } from '@/apis/notice/request';
import { getNoticeDetail, patchNotice, writeNotice } from '@/apis/notice';

interface Props {
  type?: 'write' | 'patch';
}

export function WriteNotice({ type = 'write' }: Props) {
  const { noticeId } = useParams();
  const [noticeContent, setNoticeContent] = useState<WriteNoticeRequest>({
    title: '',
    content: '',
  });
  useEffect(() => {
    type === 'patch' &&
      getNoticeDetail(noticeId).then((res) => setNoticeContent({
        title: res.title,
        content: res.content,
      }));
  }, [type, noticeId]);
  const onChangeTextArea = (value: string, name: string) => {
    setNoticeContent({
      ...noticeContent,
      [name]: value,
    });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onClickWriteNotice = () => {
    if (type === 'write') {
      writeNotice(noticeContent)
        .then(() => {})
        .catch();
    } else patchNotice(noticeContent, noticeId).then().catch();
  };
  return (
    <WithNavigatorBar>
      <_BackgroundColor>
        <_Wrapper onSubmit={onSubmit}>
          <_Path />
          <TextArea
            limit={100}
            className="title"
            onChange={onChangeTextArea}
            value={noticeContent.title}
            placeholder="제목을 입력해주세요."
            name="title"
          />
          <TextArea
            limit={1000}
            className="content"
            onChange={onChangeTextArea}
            value={noticeContent.content}
            placeholder="내용을 입력해주세요."
            name="content"
          />
          <Button
            className="submitButton"
            type="contained"
            onClick={onClickWriteNotice}
            color="primary"
            size="large"
            disabled={!(noticeContent.title && noticeContent.content && true)}
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
