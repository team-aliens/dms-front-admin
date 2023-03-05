import { Button, Text } from '@team-aliens/design-system';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { useModal } from '@/hooks/useModal';
import { DeletePointListModal } from '../modals/DeletePointList';
import { AllPointItem } from '@/components/main/DetailBox/PointItem';
import {
  useAllPointHistory,
  useCancelPointHistory,
  usePointOptionList,
} from '@/hooks/usePointsApi';
import { PointHistroyIdAtom } from '@/utils/atoms';
import { ViewPointOptionsModal } from '../modals/ViewPointOptionsModal';
import { useState } from 'react';
import { DeletePointOptionModal } from '../modals/DeletePointOption';
import { useDeletePointOption } from '@/apis/points';

export function PointList() {
  const { modalState, closeModal, selectModal } = useModal();
  const [pointHistoryId] = useRecoilState(PointHistroyIdAtom);
  const { data, refetch: refetchAllPointHistory } = useAllPointHistory('ALL');
  const cancelPoint = useCancelPointHistory(pointHistoryId, {
    onSuccess: () => refetchAllPointHistory(),
  });
  const openPointOptionModal = () => selectModal('POINT_OPTIONS');

  const { data: allPointOptions, refetch: refetchAllPointOptions } =
    usePointOptionList();
  // const { data: excel } = useDownLoadExcelFile();

  const [selectedPointOption, setSelectedPointOption] = useState<string>('');

  const deletePointOptionAPI = useDeletePointOption(selectedPointOption, {
    onSuccess: () => {
      selectModal('POINT_OPTIONS');
      refetchAllPointOptions();
      setSelectedPointOption('');
    },
  });

  return (
    <_Wrapper>
      <Button
        margin={['left', 'auto']}
        className="pointList"
        onClick={openPointOptionModal}
      >
        상/벌점 항목 보기
      </Button>
      <_Display>
        <Text margin={['bottom', 10]} color="gray6" size="titleL">
          전체 학생 상/벌점
        </Text>
        <Button color="gray" kind="outline">
          엑셀 출력
        </Button>
      </_Display>
      {data?.point_histories.map((res, i) => {
        const {
          point_history_id,
          student_name,
          student_gcn,
          point_name,
          point_score,
          point_type,
          date,
        } = res;
        const isSameDate = res.date === data?.point_histories[i - 1]?.date;
        return (
          <>
            {!isSameDate && (
              <Text margin={[30, 0, 9, 0]} color="gray6" size="titleS">
                {date}
              </Text>
            )}
            <AllPointItem
              key={point_history_id}
              point_history_id={point_history_id}
              student_name={student_name}
              student_gcn={student_gcn}
              point_name={point_name}
              point_score={point_score}
              point_type={point_type}
            />
          </>
        );
      })}
      {modalState.selectedModal === 'DELETE_POINT_LIST' && (
        <DeletePointListModal
          onClick={cancelPoint.mutate}
          closeModal={closeModal}
        />
      )}
      {modalState.selectedModal === 'POINT_OPTIONS' && (
        <ViewPointOptionsModal
          selectedPointOption={selectedPointOption}
          setSelectedPointOption={setSelectedPointOption}
          close={closeModal}
          allPointOptions={allPointOptions}
          refetchAllPointOptions={refetchAllPointOptions}
        />
      )}
      {modalState.selectedModal === 'DELETE_POINT_OPTION' && (
        <DeletePointOptionModal
          setSelectedOption={setSelectedPointOption}
          onClick={deletePointOptionAPI.mutate}
          closeModal={closeModal}
        />
      )}
    </_Wrapper>
  );
}

const _Wrapper = styled.div`
  width: 670px;
  margin-right: 361px;
  margin-left: 50px;
  margin-bottom: 150px;
`;

const _Display = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px 0 10px 0;
`;
