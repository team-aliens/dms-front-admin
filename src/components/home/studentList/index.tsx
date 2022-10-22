import styled from 'styled-components';
import { Button, Title } from 'aliens-design-system-front';
import { StudentBox } from './StudentBox';

export function StudentList() {
  const onClick = () => {};

  return (
    <_Wrapper>
      <div>
        <_FilterWrapper>
          <Button
            size="default"
            disabled={false}
            color="gray"
            onClick={onClick}
            type="outline"
          >
            학번순
          </Button>
        </_FilterWrapper>
        <_StudentListWrapper>
          <StudentBox />
          <StudentBox />
          <StudentBox />
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
