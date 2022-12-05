import { WriteNoticeRequest } from '@/apis/notice/request';
import { useWriteNotice } from '@/hooks/useNoticeApi';
import { WriteNotice } from '@/components/notice/WriteNoticeForm';
import { useForm } from '@/hooks/useForm';

export function WriteNoticePage() {
  const { state: noticeContent, onHandleChange } = useForm<WriteNoticeRequest>({
    title: '',
    content: '',
  });
  const writeNotice = useWriteNotice(noticeContent);

  return (
    <WriteNotice
      title={noticeContent.title}
      content={noticeContent.content}
      onClick={writeNotice.mutate}
      onChange={onHandleChange}
    />
  );
}
