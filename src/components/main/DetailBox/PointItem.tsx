import { Text, Trash } from '@team-aliens/design-system';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { useModal } from '@/hooks/useModal';
import {
  AllPointItemType,
  StudentPointHistoryType,
} from '@/apis/points/response';
import { PointHistroyIdAtom } from '@/utils/atoms';
import { PointEnum, PointType } from '@/apis/points';

interface PropsType extends StudentPointHistoryType {
  isDeleteListOption?: boolean;
  canDelete?: boolean;
  canClick?: boolean;
  onClick?: (id: string, name: string, score: number, type: PointType) => void;
  OptionSelected?: string;
}

export function PointItem({
  isDeleteListOption = false,
  canDelete = false,
  canClick = false,
  onClick,
  OptionSelected,
  point_history_id,
  name,
  score,
  type,
}: PropsType) {
  const { selectModal } = useModal();
  const setPointHistoryId = useSetRecoilState(PointHistroyIdAtom);
  const openCancelPointModal = () => {
    selectModal('DELETE_POINT_LIST');
    setPointHistoryId(point_history_id);
  };

  const openDeletePointModal = () => {
    selectModal('DELETE_POINT_OPTION');
  };

  return (
    <_Wrapper
      className="grantPoint"
      canClick={canClick}
      type={type}
      onClick={() => onClick(point_history_id, name, score, type)}
      OptionSelected={OptionSelected === point_history_id}
    >
      {canClick && OptionSelected === point_history_id ? (
        <Text
          className="grantPoint"
          margin={[0, 20]}
          color={type === 'BONUS' ? 'primary' : 'error'}
          size="BtnM"
        >
          {name}
        </Text>
      ) : (
        <Text className="grantPoint" margin={[0, 20]} color="gray6" size="BtnM">
          {name}
        </Text>
      )}
      <_PointType
        className="grantPoint"
        margin={['left', 'auto']}
        color={type === 'BONUS' ? 'primary' : 'error'}
        size="bodyS"
      >
        {PointEnum[type]}
      </_PointType>
      <_Line className="grantPoint" />
      {canClick && OptionSelected === point_history_id ? (
        <Text
          className="grantPoint"
          margin={[0, 30]}
          color={type === 'BONUS' ? 'primary' : 'error'}
        >
          {score}
        </Text>
      ) : (
        <Text className="grantPoint" margin={[0, 30]} color="gray6">
          {score}
        </Text>
      )}
      {canDelete && (
        <>
          <_Line />
          <_Delete
            onClick={
              isDeleteListOption ? openDeletePointModal : openCancelPointModal
            }
          >
            <Trash colorKey="gray5" />
          </_Delete>
        </>
      )}
    </_Wrapper>
  );
}

// 전체내역 확인할 때 사용되는 컴포넌트
export function AllPointItem({
  point_history_id,
  student_name,
  student_gcn,
  point_name,
  point_score,
  point_type,
}: AllPointItemType) {
  const { selectModal } = useModal();
  const setPointHistoryId = useSetRecoilState(PointHistroyIdAtom);
  const openCancelPointModal = () => {
    selectModal('DELETE_POINT_LIST');
    setPointHistoryId(point_history_id);
  };

  return (
    <_AllPointWrapper>
      <Text margin={[0, 20, 0, 30]} color="gray10" size="bodyL">
        {student_name}
      </Text>
      <Text margin={['right', 'auto']} color="gray6" size="bodyL">
        {student_gcn}
      </Text>
      <Text margin={[0, 30]} color="gray6" size="BtnM">
        {point_name}
      </Text>
      <_Line />
      <Text
        margin={[0, 30]}
        color={point_type === 'BONUS' ? 'primary' : 'error'}
        size="bodyS"
      >
        {point_type === 'BONUS' ? '상점' : '벌점'}
      </Text>
      <_Line />
      <Text margin={[0, 30]}>{point_score}</Text>
      <_Line />
      <_Delete onClick={openCancelPointModal}>
        <Trash colorKey="gray5" />
      </_Delete>
    </_AllPointWrapper>
  );
}

const _Wrapper = styled.div<{
  canClick?: boolean;
  OptionSelected?: boolean;
  type: string;
}>`
  display: flex;
  cursor: ${({ canClick }) => (canClick ? 'pointer' : 'default')};
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.color.gray2};
  border: 2px solid
    ${({ OptionSelected, type, canClick }) => {
      if (canClick && OptionSelected) {
        if (type === 'BONUS') return '#3D8AFF';
        return '#FF4646';
      }
      return '#EEEEEE';
    }};
  border-radius: 4px;
`;

const _AllPointWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: ${({ theme }) => theme.color.gray1};
  margin-top: 10px;
  border-radius: 5px;
  box-shadow: 0px 1px 20px rgba(238, 238, 238, 0.8);
`;

const _Line = styled.div`
  width: 1px;
  height: 30px;
  background-color: #eeeeee;
`;

const _PointType = styled(Text)`
  margin-right: 30px;
`;

const _Delete = styled.div`
  margin: 0 12px;
  cursor: pointer;
`;
