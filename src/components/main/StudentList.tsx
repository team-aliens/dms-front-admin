import styled from 'styled-components';
import { Button, SearchBox, Sort } from '@team-aliens/design-system';
import { ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';
import { SortEnum } from '@/apis/managers';
import { StudentBox } from '@/components/main/StudentBox';
import { StudentInfo } from '@/apis/managers/response';
import { useModal } from '@/hooks/useModal';
import { PointFilterModal } from '@/components/modals/PointFilter';
import { DeletePointListModal } from '../modals/DeletePointList';
import { PointHistroyIdAtom } from '@/utils/atoms';
import { useCancelPointHistory } from '@/hooks/usePointsApi';
import { FilterState, ModeType } from '@/pages/Home';
import { PointEnum, PointType } from '@/apis/points';
import { DeleteStudentModal } from '../modals/DeleteStudent';

interface Props extends FilterState {
  mode: ModeType;
  selectedStudentId: string;
  studentList: StudentInfo[];
  startPoint: number;
  endPoint: number;
  onChangeSearchName: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeSortType: () => void;
  onClickStudent: (id: string) => void;
  onChangeFilterType: (type: PointType) => void;
  onChangeLimitPoint: (startPoint: number, endPoint: number) => void;
}

export function StudentList({
  mode,
  selectedStudentId,
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
}: Props) {
  const { modalState, selectModal, closeModal } = useModal();
  const openPointFilterModal = () => selectModal('POINT_FILTER');
  const openPointOptionsModal = () => selectModal('POINT_OPTIONS');
  const [pointHistoryId] = useRecoilState(PointHistroyIdAtom);
  const cancelPoint = useCancelPointHistory(pointHistoryId);

  const filterText = () => {
    if (startPoint === -100 && endPoint === 100 && filterType === 'ALL') {
      return '상/벌점 필터';
    }
    return `${PointEnum[filterType]} / ${startPoint}~${endPoint}점`;
  };

  return (
    <_Wrapper detailIsOpened={selectedStudentId !== ''}>
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
            <Button onClick={openPointOptionsModal}>상/벌점 항목 보기</Button>
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
            studentInfo={item}
            onClickStudent={onClickStudent}
            isSelected={selectedStudentId === item.id}
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
        <DeleteStudentModal
          selectedStudentId={selectedStudentId}
          close={closeModal}
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
