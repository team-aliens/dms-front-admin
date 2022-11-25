import styled from 'styled-components';
import { Button, SearchBox, Sort } from 'aliens-design-system-front';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { SortType, SortEnum, searchStudentList } from '@/apis/managers';
import { StudentBox } from '@/components/main/StudentBox';
import { StudentInfo } from '@/apis/managers/response';
import { useDebounce } from '@/hooks/useDebounce';

interface FilterState {
  name: string;
  sort: SortType;
}

interface Props {
  selectedStudentId: string;
  setSelectedStudentId: Dispatch<SetStateAction<string>>;
}

export function StudentList({
  selectedStudentId,
  setSelectedStudentId,
}: Props) {
  const { debounce } = useDebounce();
  const [filter, setFilter] = useState<FilterState>({
    name: '',
    sort: 'GCN',
  });
  const [studentList, setStudentList] = useState<StudentInfo[]>([
    {
      id: '9c4f2fd8-4311-11ed-b878-0242ac120002',
      name: '김범진',
      gcn: '2206',
      room_number: 414,
      profile_image_url: 'https://~~',
    },
    {
      id: '7c4f2fd8-4311-11ed-b878-0242ac120002',
      name: '이준서',
      gcn: '2117',
      room_number: 413,
      profile_image_url: 'https://~~',
    },
  ]);
  const onClickStudent = (id: string) => {
    if (selectedStudentId === id) setSelectedStudentId('');
    else setSelectedStudentId(id);
  };

  useEffect(() => {
    debounce(
      () => searchStudentList(filter.name, filter.sort)
        .then((res) => {
          setStudentList(res.students);
        })
        .catch(() => {}),
      500,
    );
  }, [filter.sort, filter.name]);

  const onChangeSortType = () => {
    const value: SortType = filter.sort === 'GCN' ? 'NAME' : 'GCN';
    setFilter({
      ...filter,
      sort: value,
    });
  };
  const onChangeSearchName = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter({
      ...filter,
      name: e.target.value,
    });
  };
  return (
    <_Wrapper detailIsOpened={selectedStudentId !== ''}>
      <_Filter className="filter">
        <SearchBox
          className="searchBox"
          value={filter.name}
          onChangeValue={onChangeSearchName}
        />
        <Button
          type="outline"
          color="gray"
          onClick={onChangeSortType}
          Icon={<Sort size={18} />}
          className="filterButton"
        >
          {SortEnum[filter.sort]}
          순
        </Button>
      </_Filter>
      <_StudentList>
        {studentList.map((item) => (
          <StudentBox
            studentInfo={item}
            onClickStudent={onClickStudent}
            isSelected={selectedStudentId === item.id}
          />
        ))}
      </_StudentList>
    </_Wrapper>
  );
}

const _Wrapper = styled.div<{
  detailIsOpened: boolean;
}>`
  width: ${({ detailIsOpened }) => (detailIsOpened ? 514 : 770)}px;
  transition: width 0.7s ease-in-out;
`;
const _Filter = styled.section`
  display: flex;
  > button {
    margin-left: auto;
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
`;
