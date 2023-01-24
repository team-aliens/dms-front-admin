import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Text, BreadCrumb } from '@team-aliens/design-system';
import { NoticeDetailSummary } from '@/components/notice/NoticeDetailSummary';
import { WithNavigatorBar } from '@/components/WithNavigatorBar';
import { useModal } from '@/hooks/useModal';
import { DeleteNoticeConfirm } from '@/components/modals/DeleteNoticeConfirm';
import { useDeleteNotice, useNoticeDetail } from '@/hooks/useNoticeApi';
import { pathToKorean } from '@/router';

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
          <BreadCrumb left={366} pathToKorean={pathToKorean} />
          <Text
            size="titleM"
            color="gray10"
            display="inline-block"
            margin={['top', 160]}
          >
            {detail?.title}
          </Text>
          <NoticeDetailSummary
            onClickDeleteNotice={onClickDeleteNotice}
            createdDate={detail?.created_at}
            noticeId={noticeId}
          />
          <Text
            color="gray7"
            size="bodyM"
            display="inline-block"
            margin={['top', 40]}
          >
            {detail?.content}
          </Text>
        </_Wrapper>
      </WithNavigatorBar>
    </>
  );
}

const _Wrapper = styled.div`
  width: 1030px;
  margin: 0 auto;
`;
