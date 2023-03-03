import { Button, MegaPhone, Text } from '@team-aliens/design-system';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ApplicationTimeResponse } from '@/apis/studyRooms/response';
import { useModal } from '@/hooks/useModal';
import { SetApplicationTimeModal } from '@/components/modals/SetApplicationTime';
import { pagePath } from '@/utils/pagePath';

export function StudyListOptions({
  start_at,
  end_at,
}: ApplicationTimeResponse) {
  const { selectModal, modalState, closeModal } = useModal();
  return (
    <>
      {modalState.selectedModal === 'APPLICATION_TIME' && (
        <SetApplicationTimeModal
          close={closeModal}
          startAt={start_at}
          endAt={end_at}
        />
      )}
      <_Wrapper>
        <_ApplyAbleTime>
          <MegaPhone fill={false} colorKey="primary" />
          <Text margin={['left', 20]} color="gray9" size="bodyS">
            {/* 자습실 신청 시간을 입력해주세요. */}
            자습실 신청 시간은 {start_at?.slice(0, 5)} ~ {end_at?.slice(0, 5)}
            까지 입니다.
          </Text>
          <Button
            kind="text"
            color="primary"
            margin={['left', 'auto']}
            onClick={() => selectModal('APPLICATION_TIME')}
          >
            수정
          </Button>
        </_ApplyAbleTime>
        <_CreateBtn to={pagePath.apply.studyRoom.create}>
          <Button kind="outline" color="primary">
            자습실 생성
          </Button>
        </_CreateBtn>
      </_Wrapper>
    </>
  );
}

const _Wrapper = styled.div`
  display: flex;
`;

const _ApplyAbleTime = styled.div`
  display: flex;
  align-items: center;
  min-width: 400px;
  height: 50px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.gray1};
  padding-left: 20px;
  box-shadow: 0 1px 20px rgba(238, 238, 238, 0.8);
  > button {
    min-width: 58px;
  }
`;

const _CreateBtn = styled(Link)`
  margin-left: auto;
`;
