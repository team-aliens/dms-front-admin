import { Button, SeeMore, Text } from '@team-aliens/design-system';
import { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import styled from 'styled-components';

interface PropsType {
  id: string;
  title: string;
  description: string;
  is_applied: boolean;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, description: string) => void;
}

export const RemainOption = ({
  id,
  title,
  description,
  is_applied,
  onDelete,
  onEdit,
}: PropsType) => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <_ListWrapper key={id}>
      <_Title>{title}</_Title>
      <_Text>{description}</_Text>
      <_CheckInput kind="text" size="default" onClick={() => setIsOpened(true)}>
        <SeeMore />
      </_CheckInput>
      {isOpened && (
        <OutsideClickHandler onOutsideClick={() => setIsOpened(false)}>
          <_MenuWrapper>
            <Text color="error" onClick={() => onDelete(id)}>
              항목 삭제
            </Text>
            <_Line />
            <Text color="gray6" onClick={() => onEdit(id, title, description)}>
              항목 수정
            </Text>
          </_MenuWrapper>
        </OutsideClickHandler>
      )}
    </_ListWrapper>
  );
};

const _ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 16px;
  padding: 28px 0 0 40px;
  width: 1030px;
  min-height: 180px;
  box-shadow: 0 1px 20px rgba(238, 238, 238, 0.8);
  border-radius: 4px;
`;
const _Title = styled.p`
  font-weight: 700;
  font-size: 22px;
`;
const _Line = styled.div`
  width: 129px;
  height: 2px;
  background-color: #eeeeee;
`;
const _Text = styled.p`
  width: 729px;
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
`;
const _MenuWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  gap: 15px;
  top: 56px;
  right: 20px;
  width: 160px;
  height: 112px;
  cursor: pointer;
  box-shadow: 0 1px 20px rgba(238, 238, 238, 0.8);
  border-radius: 6px;
  background-color: white;
`;
const _CheckInput = styled(Button)`
  min-width: 24px;
  width: 24px;
  border: none;
  padding: 0;
  height: 24px;
  appearance: none;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  :hover {
    background-color: transparent;
  }
`;
