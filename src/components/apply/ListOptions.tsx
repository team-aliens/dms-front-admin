import { Button, MegaPhone, Text } from '@team-aliens/design-system';
import styled from 'styled-components';

export function StudyListOptions() {
  return (
    <_Wrapper>
      <_ApplyAbleTime>
        <MegaPhone fill={false} colorKey="primary" />
        <Text margin={['left', 20]} color="gray5">
          자습실 신청 시간을 입력해주세요.
        </Text>
        <Button kind="text" color="primary" margin={['left', 'auto']}>
          수정
        </Button>
      </_ApplyAbleTime>
      <Button kind="outline" color="primary" margin={['left', 'auto']}>
        자습실 생성
      </Button>
    </_Wrapper>
  );
}

const _Wrapper = styled.div`
  display: flex;
`;

const _ApplyAbleTime = styled.div`
  display: flex;
  align-items: center;
  width: 400px;
  height: 50px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.gray1};
  padding-left: 20px;
  box-shadow: 0 1px 20px rgba(238, 238, 238, 0.8);
`;
