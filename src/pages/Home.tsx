import styled from 'styled-components';
import { ChangeEvent, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { Button, Change } from '@team-aliens/design-system';
import { StudentList } from '@/components/main/StudentList';
import { Divider } from '@/components/main/Divider';
import { StudentDetail } from '@/components/main/DetailBox/StudentDetail';
import { WithNavigatorBar } from '@/components/WithNavigatorBar';
import { SortType } from '@/apis/managers';
import { useDebounce } from '@/hooks/useDebounce';
import { useObj } from '@/hooks/useObj';
import { useSearchStudents, useStudentDetail } from '@/hooks/useMangersApis';
import { PointList } from '@/components/main/PointList';
import { PointType } from '@/apis/points';
import { useModal } from '@/hooks/useModal';

export interface FilterState {
  name: string;
  sort: SortType;
  filterType: PointType;
}

export interface LimitPoint {
  startPoint: number;
  endPoint: number;
}

export type ModeType = 'GENERAL' | 'POINTS';
export type ListViewType = 'STUDENTS' | 'POINTS';

interface Mode {
  type: ModeType;
  text: string;
}

export function Home() {
  const { debounce } = useDebounce();

  const { modalState, closeModal } = useModal();

  const { obj: filter, changeObjectValue } = useObj<FilterState>({
    name: '',
    sort: 'GCN',
    filterType: 'ALL',
  });
  const [limitPoint, setLimitPoint] = useState<LimitPoint>({
    startPoint: -100,
    endPoint: 100,
  });

  const [debouncedName, setDebouncedName] = useState(filter.name);
  const [selectedStudentId, setSelectedStudentId] = useState<string[]>(['']);
  const [mode, setMode] = useState<Mode>({
    type: 'GENERAL',
    text: '상벌점 부여',
  });
  const [listViewType, setListViewType] = useState<ListViewType>('POINTS');

  const { data: studentDetail } = useStudentDetail(selectedStudentId[0]);

  const { data: studentList } = useSearchStudents({
    name: debouncedName,
    sort: filter.sort,
    filter_type: filter.filterType,
    min_point: limitPoint.startPoint,
    max_point: limitPoint.endPoint,
  });

  const onChangeSortType = () => {
    const value: SortType = filter.sort === 'GCN' ? 'NAME' : 'GCN';
    changeObjectValue('sort', value);
  };

  const onChangeFilterType = (type: PointType) => {
    changeObjectValue('filterType', type);
  };

  const onChangeLimitPoint = (startPoint: number, endPoint: number) => {
    setLimitPoint({ startPoint, endPoint });
  };

  const onChangeSearchName = (e: ChangeEvent<HTMLInputElement>) => {
    changeObjectValue('name', e.target.value);
    debounce(() => setDebouncedName(e.target.value), 200);
  };

  const onClickStudent = (id: string, modeType?: ModeType) => {
    if (modeType === 'POINTS') {
      if (selectedStudentId.includes(id)) {
        setSelectedStudentId(
          selectedStudentId.filter((element) => element !== id),
        );
      } else {
        if (selectedStudentId[0] === '') selectedStudentId[0] = id;
        else selectedStudentId[selectedStudentId.length] = id;
        setSelectedStudentId([...selectedStudentId]);
      }
    } else {
      selectedStudentId[0] = selectedStudentId[0] === id ? '' : id;
      setSelectedStudentId([...selectedStudentId]);
    }
  };
  const ChangeMode = () => {
    switch (mode.type) {
      case 'GENERAL':
        setMode({ ...mode, type: 'POINTS', text: '일반' });
        break;
      case 'POINTS':
        setMode({ ...mode, type: 'GENERAL', text: '상/벌점 부여' });
        setListViewType('POINTS');
        break;
      default:
        break;
    }
  };

  const ChangeListMode = () => {
    switch (listViewType) {
      case 'STUDENTS':
        setListViewType('POINTS');
        break;
      case 'POINTS':
        setListViewType('STUDENTS');
        break;
      default:
        break;
    }
  };

  return (
    <WithNavigatorBar>
      <_Wrapper>
        <_ModeButton onClick={ChangeMode} Icon={<Change />}>
          {mode.text}
        </_ModeButton>
        {mode.type === 'POINTS' && (
          <_PointListButton
            onClick={ChangeListMode}
            color="gray"
            kind="outline"
          >
            {listViewType === 'POINTS' ? '전체 상/벌점 내역' : '학생 목록 보기'}
          </_PointListButton>
        )}
        {listViewType === 'POINTS' ? (
          <>
            <StudentList
              mode={mode.type}
              studentList={studentList?.students || []}
              selectedStudentId={selectedStudentId}
              name={filter.name}
              sort={filter.sort}
              filterType={filter.filterType}
              startPoint={limitPoint.startPoint}
              endPoint={limitPoint.endPoint}
              onChangeSearchName={onChangeSearchName}
              onChangeSortType={onChangeSortType}
              onClickStudent={onClickStudent}
              onChangeLimitPoint={onChangeLimitPoint}
              onChangeFilterType={onChangeFilterType}
            />
            <Divider />
            <OutsideClickHandler
              onOutsideClick={(e: MouseEvent) => {
                const { className } = e.target as Element;
                const isClickAbleElement =
                  className.includes('studentBox') ||
                  className.includes('filterButton') ||
                  className.includes('searchBox') ||
                  className.includes('grantPoint') ||
                  className.includes('modalButton');
                if (!isClickAbleElement) setSelectedStudentId(['']);
              }}
            >
              <StudentDetail
                mode={mode.type}
                studentDetail={studentDetail}
                studentId={selectedStudentId}
                onClickStudent={onClickStudent}
              />
            </OutsideClickHandler>
          </>
        ) : (
          <PointList />
        )}
      </_Wrapper>
    </WithNavigatorBar>
  );
}

const _Wrapper = styled.div`
  display: flex;
  margin: 160px auto 0 auto;
`;

const _ModeButton = styled(Button)`
  position: absolute;
  top: 50px;
  margin-left: 20px;
`;

const _PointListButton = styled(Button)`
  position: fixed;
  top: 50px;
  right: 60px;
`;
