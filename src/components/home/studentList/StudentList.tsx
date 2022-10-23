import { useState } from 'react';
import styled from 'styled-components';
import { Button, Title } from 'aliens-design-system-front';
import { StudentBox } from './StudentBox';

const StudentData = {
  StudentList: [
    {
      id: 'a1',
      name: 'aaa',
      gcn: '1111',
      room_number: 101,
      profile_image_url: 'asd',
    },
    {
      id: 'a1',
      name: 'aaa',
      gcn: '1111',
      room_number: 201,
      profile_image_url: 'asd',
    },
    {
      id: 'a1',
      name: 'aaa',
      gcn: '1111',
      room_number: 301,
      profile_image_url: 'asd',
    },
    {
      id: 'a1',
      name: 'aaa',
      gcn: '1111',
      room_number: 401,
      profile_image_url: 'asd',
    },
  ],
};

export function StudentList() {
  const [selected, setSelected] = useState<boolean>(false);
  const [cur, setCur] = useState<number>();

  const onClickSelectedButton = () => {};

  const onStudentBoxClick = (num: number) => {
    setSelected(true);
    setCur(num);
  };

  return (
    <_Wrapper>
      <div>
        <_FilterWrapper>
          <Button size="default" disabled={false} color="gray" onClick={onClickSelectedButton} type="outline">
            학번순
          </Button>
        </_FilterWrapper>
        <_StudentListWrapper>
          {StudentData.StudentList.map((data, index) => (
            <StudentBox
              onClick={() => onStudentBoxClick((index + 1) * 10)}
              selected={(index + 1) * 10 === cur}
            />
          ))}
        </_StudentListWrapper>
      </div>
      <hr />
    </_Wrapper>
  );
}

const _Wrapper = styled.div`
  display: flex;
  > hr {
    width: 1px;
    height: 760px;
    margin-left: 104px;
    margin-right: 100px;
    background-color: ${({ theme }) => theme.color.gray3};
  }
`;

const _FilterWrapper = styled.div`
  width: 530px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 36px;
`;

const _StudentListWrapper = styled.div``;

const _DetailStudentWrapper = styled.div``;

const _DetailStudentTitle = styled(Title)`
  margin-bottom: 43px;
`;
