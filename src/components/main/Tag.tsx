import { tagTextColor } from '@/utils/tagColor';
import React, { useState } from 'react';
import styled from 'styled-components';
import Cancel from '@team-aliens/design-system/dist/components/styleGuide/icon/Cancel';
import { useModal } from '@/hooks/useModal';
import { useSetRecoilState } from 'recoil';
import { DeleteTagIdAtom } from '@/utils/atoms';

interface PropsType {
  id: string;
  color: string;
  name: string;
  canHover?: boolean;
}

export function Tag({ id, color, name, canHover = false }: PropsType) {
  const [hover, setHover] = useState(false);
  const { selectModal } = useModal();
  const setTagId = useSetRecoilState(DeleteTagIdAtom);

  const mouseHover = () => {
    setHover(!hover);
  };

  return (
    <_Tag
      canHover={canHover}
      color={color}
      onMouseEnter={mouseHover}
      onMouseLeave={mouseHover}
    >
      <_Circle color={color}></_Circle>
      {name}
      {canHover && hover && (
        <_Wrapper
          onClick={() => {
            selectModal('DELETE_STUDENT_TAG');
            setTagId(id);
          }}
        >
          <Cancel color={tagTextColor[color]} size={16} />
        </_Wrapper>
      )}
    </_Tag>
  );
}

const _Tag = styled.div<{ color: string; canHover: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  height: 26px;
  border-radius: 13px;
  padding: 10px;
  gap: 4px;
  background-color: ${({ color }) => color};
  color: ${({ color }) => tagTextColor[color]};
  ${({ theme }) => theme.font.captionM};
  cursor: default;
  &:hover {
    ${({ canHover }) => canHover && 'padding: 10px 30px 10px 10px;'}
    transition: 0.4s;
  }
`;

const _Circle = styled.div<{ color: string }>`
  width: 7px;
  height: 7px;
  margin: 4px;
  border-radius: 50px;
  background-color: ${({ color, theme }) =>
    tagTextColor[color] ?? theme.color.gray10};
`;

const _Wrapper = styled.div`
  position: absolute;
  right: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
