import styled from 'styled-components';
import { ChangeEvent, useState } from 'react';
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
import { useStudentPointHistory } from '@/hooks/usePointsApi';
import { usePointHistoryList } from '@/hooks/usePointHistoryList';
import { TagType } from '@/apis/tags/response';

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
  const { state: studentsPointHistoryList } = usePointHistoryList();

  const { obj: filter, changeObjectValue } = useObj<FilterState>({
    name: '',
    sort: 'GCN',
    filterType: 'ALL',
  });
  const [limitPoint, setLimitPoint] = useState<LimitPoint>({
    startPoint: -100,
    endPoint: 100,
  });
  const [checkedTagList, setCheckedTagList] = useState<TagType[]>([]);

  const [debouncedName, setDebouncedName] = useState(filter.name);
  const [selectedStudentId, setSelectedStudentId] = useState<string[]>(['']);

  const [mode, setMode] = useState<Mode>({
    type: 'GENERAL',
    text: '부여',
  });
  const [listViewType, setListViewType] = useState<ListViewType>('POINTS');

  const { data: studentDetail, refetch: refetchStudentDetail } =
    useStudentDetail(selectedStudentId[0]);

  const { data: studentList, refetch: refetchSearchStudents } =
    useSearchStudents({
      name: debouncedName,
      sort: filter.sort,
      filter_type: filter.filterType,
      min_point: limitPoint.startPoint,
      max_point: limitPoint.endPoint,
      tag_id: checkedTagList,
    });

  const { data: studentPointHistory, refetch: refetchStudentPointHistory } =
    useStudentPointHistory(selectedStudentId[selectedStudentId.length - 1]);

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
        setSelectedStudentId([...selectedStudentId, id]);
      }
    } else {
      setSelectedStudentId(selectedStudentId[0] === id ? [''] : [id]);
    }
  };

  const ChangeMode = () => {
    switch (mode.type) {
      case 'GENERAL':
        setMode({ ...mode, type: 'POINTS', text: '일반' });
        break;
      case 'POINTS':
        setMode({ ...mode, type: 'GENERAL', text: '부여' });
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
        <_ModeButton
          onClick={() => {
            ChangeMode();
            setSelectedStudentId(['']);
          }}
          Icon={<Change />}
        >
          {mode.text}
        </_ModeButton>
        {mode.type === 'POINTS' && (
          <_PointListButton
            onClick={() => {
              ChangeListMode();
            }}
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
              setSelectedStudentId={setSelectedStudentId}
              name={filter.name}
              sort={filter.sort}
              filterType={filter.filterType}
              startPoint={limitPoint.startPoint}
              endPoint={limitPoint.endPoint}
              checkedTagList={checkedTagList}
              setCheckedTagList={setCheckedTagList}
              onChangeSearchName={onChangeSearchName}
              onChangeSortType={onChangeSortType}
              onClickStudent={onClickStudent}
              onChangeLimitPoint={onChangeLimitPoint}
              onChangeFilterType={onChangeFilterType}
              refetchSearchStudents={refetchSearchStudents}
              refetchStudentDetail={refetchStudentDetail}
              refetchStudentPointHistory={refetchStudentPointHistory}
            />
            <Divider />
            <div>
              <StudentDetail
                mode={mode.type}
                studentDetail={studentDetail}
                studentId={selectedStudentId.filter((i) => i)}
                onClickStudent={onClickStudent}
                studentPointHistory={studentPointHistory}
                studentsPointHistoryList={
                  studentsPointHistoryList.pointHistoryList
                }
              />
            </div>
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
  overflow-y: scroll;
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
