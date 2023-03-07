import styled from 'styled-components';
import { Button, SearchBox, Sort } from '@team-aliens/design-system';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useRecoilState } from 'recoil';
import { SortEnum } from '@/apis/managers';
import { StudentBox } from '@/components/main/StudentBox';
import { StudentInfo } from '@/apis/managers/response';
import { useModal } from '@/hooks/useModal';
import { PointFilterModal } from '@/components/modals/PointFilter';
import { DeletePointListModal } from '../modals/DeletePointList';
import { PointHistroyIdAtom } from '@/utils/atoms';
import {
  useCancelPointHistory,
  usePointOptionList,
} from '@/hooks/usePointsApi';
import { FilterState, ModeType } from '@/pages/Home';
import { PointEnum, PointType, useDeletePointOption } from '@/apis/points';
import { DeleteStudentModal } from '../modals/DeleteStudent';
import { useDeleteStudent } from '@/hooks/useMangersApis';
import { GivePointOptionsModal } from '../modals/GivePointOptionsModal';
import { ViewPointOptionsModal } from '../modals/ViewPointOptionsModal';
import { DeletePointOptionModal } from '../modals/DeletePointOption';
import { useToast } from '@/hooks/useToast';

interface Props extends FilterState {
  mode: ModeType;
  selectedStudentId: string[];
  setSelectedStudentId: Dispatch<SetStateAction<string[]>>;
  studentList: StudentInfo[];
  startPoint: number;
  endPoint: number;
  onChangeSearchName: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeSortType: () => void;
  onClickStudent: (id: string, modeType?: ModeType) => void;
  onChangeFilterType: (type: PointType) => void;
  onChangeLimitPoint: (startPoint: number, endPoint: number) => void;
  refetchSearchStudents?: () => void;
  refetchStudentDetail?: () => void;
  refetchStudentPointHistory: () => void;
}

export function StudentList({
  mode,
  selectedStudentId,
  setSelectedStudentId,
  studentList,
  name,
  sort,
  filterType,
  startPoint,
  endPoint,
  onChangeSearchName,
  onChangeSortType,
  onClickStudent,
  onChangeFilterType,
  onChangeLimitPoint,
  refetchSearchStudents,
  refetchStudentDetail,
  refetchStudentPointHistory,
}: Props) {
  const { modalState, selectModal, closeModal } = useModal();
  const openPointFilterModal = () => selectModal('POINT_FILTER');
  const [pointHistoryId] = useRecoilState(PointHistroyIdAtom);
  const cancelPoint = useCancelPointHistory(pointHistoryId, {
    onSuccess: () => {
      refetchStudentPointHistory();
      refetchStudentDetail();
    },
  });
  const deleteStudent = useDeleteStudent(selectedStudentId[0], {
    onSuccess: () => {
      refetchSearchStudents();
      setSelectedStudentId(['']);
      closeModal();
    },
  });

  const [selectedPointOption, setSelectedPointOption] = useState<string>('');

  const { data: allPointOptions, refetch: refetchAllPointOptions } =
    usePointOptionList();

  const { toastDispatch } = useToast();

  const deletePointOptionAPI = useDeletePointOption(selectedPointOption, {
    onSuccess: () => {
      selectModal('POINT_OPTIONS');
      refetchAllPointOptions();
      setSelectedPointOption('');
      toastDispatch({
        toastType: 'SUCCESS',
        actionType: 'APPEND_TOAST',
        message: '상/벌점 항목이 삭제되었습니다.',
      });
    },
    onError: () => {
      toastDispatch({
        toastType: 'ERROR',
        actionType: 'APPEND_TOAST',
        message: '상/벌점 항목 삭제를 실패했습니다.',
      });
    },
  });

  const filterText = () => {
    if (startPoint === -100 && endPoint === 100 && filterType === 'ALL') {
      return '상/벌점 필터';
    }
    return `${PointEnum[filterType]} / ${startPoint}~${endPoint}점`;
  };

  const pointListText = () => {
    if (selectedStudentId.filter((i) => i).length > 0) {
      return '상/벌점 부여';
    }
    return '상/벌점 항목 보기';
  };

  return (
    <_Wrapper detailIsOpened={!!selectedStudentId[0]}>
      <_Filter className="filter">
        <SearchBox
          className="searchBox"
          value={name}
          onChange={onChangeSearchName}
        />
        <_Buttons>
          {mode === 'GENERAL' ? (
            <Button onClick={openPointFilterModal}>{filterText()}</Button>
          ) : (
            <Button
              className="grantPoint"
              onClick={() =>
                selectedStudentId.filter((i) => i).length > 0
                  ? selectModal('GIVE_POINT')
                  : selectModal('POINT_OPTIONS')
              }
            >
              {pointListText()}
            </Button>
          )}
          <Button
            kind="outline"
            color="gray"
            onClick={onChangeSortType}
            Icon={<Sort />}
            className="filterButton"
          >
            {SortEnum[sort]}순
          </Button>
        </_Buttons>
      </_Filter>
      <_StudentList>
        {studentList.map((item) => (
          <StudentBox
            key={item.id}
            mode={mode}
            studentInfo={item}
            onClickStudent={onClickStudent}
            isSelected={selectedStudentId.includes(item.id)}
            selectedStudentId={selectedStudentId}
          />
        ))}
      </_StudentList>
      {modalState.selectedModal === 'POINT_FILTER' && (
        <PointFilterModal
          filterType={filterType}
          minPoint={startPoint}
          maxPoint={endPoint}
          onChangeLimitPoint={onChangeLimitPoint}
          onChangeFilterType={onChangeFilterType}
          close={closeModal}
        />
      )}
      {modalState.selectedModal === 'DELETE_POINT_LIST' && (
        <DeletePointListModal
          onClick={cancelPoint.mutate}
          closeModal={closeModal}
        />
      )}
      {modalState.selectedModal === 'DELETE_STUDENT' && (
        <DeleteStudentModal onClick={deleteStudent.mutate} close={closeModal} />
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
      {modalState.selectedModal === 'GIVE_POINT' && (
        <GivePointOptionsModal
          selectedStudentId={selectedStudentId}
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

const _Wrapper = styled.div<{
  detailIsOpened: boolean;
}>`
  width: ${({ detailIsOpened }) => (detailIsOpened ? 500 : 670)}px;
  transition: width 0.7s ease-in-out;
  margin-left: 50px;
  margin-bottom: 150px;
`;

const _Filter = styled.section`
  display: flex;
  justify-content: space-between;
  > button {
    > svg > path {
      fill: ${({ theme }) => theme.color.gray6};
    }
  }
`;
const _StudentList = styled.ul`
  margin-top: 36px;
  display: flex;
  flex-direction: column;
  gap: 16px 0;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const _Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
