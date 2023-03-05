import styled from 'styled-components';
import { Text } from '@team-aliens/design-system';
import { GetStudentDetailResponse } from '@/apis/managers/response';
import { ModeType } from '@/pages/Home';
import { DetailBox } from './DetailBox';
import { StudentPointHistoryResponse } from '@/apis/points/response';

interface Props {
  mode: ModeType;
  studentDetail: GetStudentDetailResponse;
  studentId: string[];
  onClickStudent: (id: string) => void;
  studentPointHistory: StudentPointHistoryResponse;
}

export function StudentDetail({
  mode,
  studentDetail,
  studentId,
  onClickStudent,
  studentPointHistory,
}: Props) {
  return (
    <>
      <_Wrapper isSelected={studentId[0] !== ''}>
        <_ScrollArea>
          <Text size="titleL" color="gray6">
            {mode === 'GENERAL' ? '학생 상세 확인' : '학생 상/벌점'}
          </Text>
          {studentId && studentDetail ? (
            <DetailBox
              studentId={studentId}
              mode={mode}
              studentDetail={studentDetail}
              onClickStudent={onClickStudent}
              studentPointHistory={studentPointHistory}
            />
          ) : (
            <_NotSelected
              size="bodyL"
              color="gray5"
              display="block"
              margin={['top', 40]}
            >
              {mode === 'GENERAL'
                ? '학생 목록에서 선택하여 상세 내용을 확인하세요.'
                : '학생 전체 상/벌점 내역은 학생 상세 확인해주세요.'}
            </_NotSelected>
          )}
        </_ScrollArea>
      </_Wrapper>
      <_Padding isSelected={!!studentId[0]} />
    </>
  );
}

const _Padding = styled.div<{
  isSelected: boolean;
}>`
  width: ${({ isSelected }) => (isSelected ? 466 : 300)}px;
  transition: width 0.7s ease-in-out;
  @media screen and (max-width: 1300px) {
    display: none;
  }
`;

const _Wrapper = styled.div<{
  isSelected: boolean;
}>`
  position: fixed;
  top: 168px;
  width: ${({ isSelected }) => (isSelected ? 436 : 180)}px;
  transition: width 0.7s ease-in-out;
  @media screen and (max-width: 1300px) {
    display: none;
  }
`;

const _ScrollArea = styled.div`
  width: 600px;
  height: 600px;
  padding-bottom: 50px;
  padding-left: 20px;
  overflow: scroll;
`;

const _DetailBox = styled.div`
  position: relative;
  margin-top: 43px;
  padding: 60px 40px;
  width: 436px;
  min-height: 485px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 1px 20px rgba(238, 238, 238, 0.8);
  border-radius: 4px;
`;

const _NotSelected = styled(Text)`
  width: 180px;
`;

const _PointWrapper = styled.div`
  display: flex;
  margin-top: 40px;
  > div {
    :last-child {
      margin-left: auto;
    }
  }
`;

const _MateList = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 8px;
`;

const _PointList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  gap: 10px;
`;
