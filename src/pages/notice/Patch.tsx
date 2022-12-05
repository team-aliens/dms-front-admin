import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { WriteNoticeRequest } from '@/apis/notice/request';
import { useNoticeDetail, usePatchNotice } from '@/hooks/useNoticeApi';
import { useForm } from '@/hooks/useForm';
import { WriteNotice } from '@/components/notice/WriteNoticeForm';

export function PatchNoticePage() {
  const { noticeId } = useParams();
  const noticeDetail = useNoticeDetail(noticeId);

  const {
    state: noticeContent,
    onHandleChange,
    setState,
  } = useForm<WriteNoticeRequest>({
    title: '',
    content: '',
  });

  useEffect(() => {
    if (noticeDetail && noticeDetail.isSuccess) {
      setState(noticeDetail.data);
    }
  }, [noticeDetail.isSuccess, noticeDetail.data, noticeDetail, setState]);

  const patchNotice = usePatchNotice(noticeContent, noticeId);

  return (
    <WriteNotice
      title={noticeContent.title}
      content={noticeContent.content}
      onClick={patchNotice.mutate}
      onChange={onHandleChange}
    />
  );
}
