import styled from 'styled-components';
import { ChangeEvent, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { StudentList } from '@/components/main/StudentList';
import { Divider } from '@/components/main/Divider';
import { StudentDetail } from '@/components/main/DetailBox/StudentDetail';
import { WithNavigatorBar } from '@/components/WithNavigatorBar';
import { SortType } from '@/apis/managers';
import { useDebounce } from '@/hooks/useDebounce';
import { useObj } from '@/hooks/useObj';
import { useSearchStudents, useStudentDetail } from '@/hooks/useMangersApis';

interface FilterState {
  name: string;
  sort: SortType;
}

export function Home() {
  const { debounce } = useDebounce();

  const { obj: filter, changeObjectValue } = useObj<FilterState>({
    name: '',
    sort: 'GCN',
  });

  const [debouncedName, setDebouncedName] = useState(filter.name);
  const { data: studentList } = useSearchStudents({
    name: debouncedName,
    sort: filter.sort,
  });

  const [selectedStudentId, setSelectedStudentId] = useState<string>('');

  const { data: studentDetail } = useStudentDetail(selectedStudentId);

  const onChangeSortType = () => {
    const value: SortType = filter.sort === 'GCN' ? 'NAME' : 'GCN';
    changeObjectValue('sort', value);
  };

  const onChangeSearchName = (e: ChangeEvent<HTMLInputElement>) => {
    changeObjectValue('name', e.target.value);
    debounce(() => setDebouncedName(e.target.value), 200);
  };
  const onClickStudent = (id: string) => {
    setSelectedStudentId((prevId) => (prevId === id ? '' : id));
  };

  return (
    <WithNavigatorBar>
      <_Wrapper>
        <StudentList
          studentList={studentList?.students || []}
          selectedStudentId={selectedStudentId}
          name={filter.name}
          sort={filter.sort}
          onChangeSearchName={onChangeSearchName}
          onChangeSortType={onChangeSortType}
          onClickStudent={onClickStudent}
        />
        <Divider />
        <OutsideClickHandler
          onOutsideClick={(e: MouseEvent) => {
            const { className } = e.target as Element;
            const isClickAbleElement =
              className.includes('studentBox') ||
              className.includes('filterButton') ||
              className.includes('searchBox');
            if (!isClickAbleElement) setSelectedStudentId('');
          }}
        >
          <StudentDetail
            studentDetail={studentDetail}
            studentId={selectedStudentId}
            onClickStudent={onClickStudent}
          />
        </OutsideClickHandler>
      </_Wrapper>
    </WithNavigatorBar>
  );
}

const _Wrapper = styled.div`
  display: flex;
  margin: 160px auto 0 auto;
`;
