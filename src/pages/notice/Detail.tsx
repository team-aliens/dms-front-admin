import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Text } from 'aliens-design-system-front';
import { NoticeDetailSummary } from '@/components/notice/NoticeDetailSummary';
import { WithNavigatorBar } from '@/components/WithNavigatorBar';
import { useModal } from '@/hooks/useModal';
import { DeleteNoticeConfirm } from '@/components/modals/DeleteNoticeConfirm';
import { useDeleteNotice, useNoticeDetail } from '@/hooks/useNoticeApi';
import { BreadCrumbWrapper } from '@/components/BreadCrumb';

const pathToKorean = {
  notice: '공지 목록',
};

export function NoticeDetail() {
  const { noticeId } = useParams();

  const { selectModal, modalState, closeModal } = useModal();

  const { data: detail } = useNoticeDetail(noticeId);
  const deleteNotice = useDeleteNotice(noticeId);

  const onClickDeleteNotice = () => {
    selectModal('DELETE_NOTICE');
  };
  return (
    <>
      {modalState.selectedModal === 'DELETE_NOTICE' && (
        <DeleteNoticeConfirm
          closeModal={closeModal}
          deleteNotice={deleteNotice.mutate}
        />
      )}
      <WithNavigatorBar>
        <_Wrapper>
          <BreadCrumbWrapper
            margin="86px 0 0 0"
            pathToKorean={pathToKorean}
          />
          <_Title size="titleM" color="gray10" display="inline-block">
            {detail?.title}
          </_Title>
          <NoticeDetailSummary
            onClickDeleteNotice={onClickDeleteNotice}
            createdDate={detail?.created_at}
            noticeId={noticeId}
          />
          <_Content color="gray7" size="bodyM" display="inline-block">
            {detail?.content}
          </_Content>
        </_Wrapper>
      </WithNavigatorBar>
    </>
  );
}

const _Wrapper = styled.div`
  width: 1030px;
  margin: 0 auto;
`;

const _Title = styled(Text)`
  margin-top: 52px;
`;

const _Content = styled(Text)`
  margin-top: 40px;
`;
