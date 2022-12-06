import { WriteNoticeRequest } from '@/apis/notice/request';
import { useWriteNotice } from '@/hooks/useNoticeApi';
import { WriteNotice } from '@/components/notice/WriteNoticeForm';
import { useForm } from '@/hooks/useForm';

const pathToKorean = {
  notice: '공지 목록',
  write: '공지 작성',
};

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
      pathToKorean={pathToKorean}
    />
  );
}
