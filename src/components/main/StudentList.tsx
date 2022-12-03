import styled from 'styled-components';
import { Button, SearchBox, Sort } from 'aliens-design-system-front';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { SortEnum } from '@/apis/managers';
import { StudentBox } from '@/components/main/StudentBox';
import { StudentInfo } from '@/apis/managers/response';

interface Props {
  selectedStudentId: string;
  setSelectedStudentId: Dispatch<SetStateAction<string>>;
  studentList: StudentInfo[];
  name: string;
  sort: 'GCN' | 'NAME';
  onChangeSearchName: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeSortType: () => void;
}

export function StudentList({
  selectedStudentId,
  setSelectedStudentId,
  studentList,
  name,
  sort,
  onChangeSearchName,
  onChangeSortType,
}: Props) {
  const onClickStudent = (id: string) => {
    setSelectedStudentId((prevId) => (prevId === id ? '' : id));
  };

  return (
    <_Wrapper detailIsOpened={selectedStudentId !== ''}>
      <_Filter className="filter">
        <SearchBox
          className="searchBox"
          value={name}
          onChangeValue={onChangeSearchName}
        />
        <Button
          type="outline"
          color="gray"
          onClick={onChangeSortType}
          Icon={<Sort size={18} />}
          className="filterButton"
        >
          {SortEnum[sort]}
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
