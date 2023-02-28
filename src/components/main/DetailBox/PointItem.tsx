import { Text, Trash } from '@team-aliens/design-system';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { useModal } from '@/hooks/useModal';
import {
  AllPointItemType,
  StudentPointHistoryType,
} from '@/apis/points/response';
import { PointHistroyIdAtom } from '@/utils/atoms';

interface PropsType extends StudentPointHistoryType {
  canDelete?: boolean;
}

export function PointItem({
  canDelete,
  point_history_id,
  name,
  score,
  type,
}: PropsType) {
  const { selectModal } = useModal();
  const [pointHistoryId, setPointHistoryId] =
    useRecoilState(PointHistroyIdAtom);
  const openDeletePointModal = () => {
    selectModal('DELETE_POINT_LIST');
    setPointHistoryId(point_history_id);
  };

  const typeChanger = () => {
    switch (type) {
      case 'BONUS':
        return '상점';
      case 'MINUS':
        return '벌점';
      default:
        return '';
    }
  };

  return (
    <_Wrapper>
      <Text margin={[0, 20]} color="gray6" size="BtnM">
        {name}
      </Text>
      <_PointType
        margin={['left', 'auto']}
        color={type === 'BONUS' ? 'primary' : 'error'}
        size="bodyS"
      >
        {typeChanger()}
      </_PointType>
      <_Line />
      <Text margin={[0, 30]}>{score}</Text>
      {canDelete && (
        <>
          <_Line />
          <_Delete onClick={openDeletePointModal}>
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
  const { selectModal, modalState, closeModal } = useModal();
  const [pointHistoryId, setPointHistoryId] =
    useRecoilState(PointHistroyIdAtom);
  const openDeletePointModal = () => {
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
      <_Delete onClick={openDeletePointModal}>
        <Trash colorKey="gray5" />
      </_Delete>
    </_AllPointWrapper>
  );
}

const _Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.color.gray2};
  border: 1px solid ${({ theme }) => theme.color.gray3};
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