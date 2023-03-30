import { Text, Trash } from '@team-aliens/design-system';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { useModal } from '@/hooks/useModal';
import { PointHistroyIdAtom } from '@/utils/atoms';
import { AllTagListPropsType } from '@/apis/tags/response';

export function TagList({
  tag_id,
  tag_name,
  tag_color,
  OptionSelected,
  onClick,
}: AllTagListPropsType) {
  const { selectModal } = useModal();
  const openCancelTagModal = () => {
    selectModal('DELETE_TAG');
  };

  return (
    <_Wrapper
      className="grantPoint"
      onClick={() => onClick(tag_id, tag_name, tag_color)}
      OptionSelectedCheck={OptionSelected === tag_id}
    >
      <_CenterWrapper>
        <_ColorCircle BackColor={tag_color} />
        {OptionSelected === tag_id ? (
          <Text
            className="grantPoint"
            margin={[0, 10]}
            color={'primary'}
            size="BtnM"
          >
            {tag_name}
          </Text>
        ) : (
          <Text
            className="grantPoint"
            margin={[0, 10]}
            color="gray6"
            size="BtnM"
          >
            {tag_name}
          </Text>
        )}
      </_CenterWrapper>
      <_CenterWrapper>
        <_Line />
        <_Delete onClick={openCancelTagModal}>
          <Trash colorKey="gray5" />
        </_Delete>
      </_CenterWrapper>
    </_Wrapper>
  );
}

const _Wrapper = styled.div<{
  OptionSelectedCheck?: boolean;
}>`
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.color.gray2};
  border: 2px solid
    ${({ OptionSelectedCheck }) =>
      OptionSelectedCheck ? '#3D8AFF' : '#EEEEEE'};
  border-radius: 4px;
`;

const _CenterWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const _AllTagWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: ${({ theme }) => theme.color.gray1};
  margin-top: 10px;
  border-radius: 5px;
  box-shadow: 0px 1px 20px rgba(238, 238, 238, 0.8);
`;

const _ColorCircle = styled.div<{
  BackColor: string;
}>`
  width: 16px;
  height: 16px;
  border: 1px Solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  background-color: ${({ BackColor }) => BackColor};
  margin-left: 14px;
`;

const _Line = styled.div`
  width: 1px;
  height: 30px;
  background-color: #eeeeee;
`;

const _Delete = styled.div`
  margin: 0 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;
