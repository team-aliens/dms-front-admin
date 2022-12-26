import { Button, Text } from '@team-aliens/design-system';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { gradeTypeToKorean, sexTypeToKorean } from '@/utils/translate';
import { GradeType, SexType } from '@/apis/studyRooms/request';
import { StudyRoomDetailResponse } from '@/apis/studyRooms/response';

interface DetailOption {
  name: string;
  value: 'total_available_seat' | 'available_sex' | 'available_grade';
  func: (item: number | SexType | GradeType) => unknown;
}

const detailOptions: DetailOption[] = [
  {
    name: '이용 가능한 자리',
    value: 'total_available_seat',
    func: (item: number) => item,
  },
  {
    name: '신청 가능 성별',
    value: 'available_sex',
    func: (item: SexType) => sexTypeToKorean(item),
  },
  {
    name: '신청 가능 학년',
    value: 'available_grade',
    func: (item: GradeType) => gradeTypeToKorean(item),
  },
];

interface PropsType {
  detail: StudyRoomDetailResponse;
  id: string;
  selectModal: () => void;
}

export function StudyRoomDetailSummary({
  detail,
  id,
  selectModal,
}: PropsType) {
  return (
    <_Options>
      {detailOptions.map((option) => {
        if (!detail) return;
        return (
          <_Summary>
            <>
              <Text size="BtnM" margin={['bottom', 12]}>
                {option.name}
              </Text>
              {option.func(detail[option.value])}
            </>
          </_Summary>
        );
      })}
      <Link to={`/apply/${id}`}>
        <Button color="primary" kind="rounded">
          수정하기
        </Button>
      </Link>
      <Button
        color="error"
        kind="rounded"
        margin={['left', 10]}
        onClick={selectModal}
      >
        삭제하기
      </Button>
    </_Options>
  );
}

const _Options = styled.div`
  display: flex;
  margin-top: 52px;
  > a {
    margin-left: auto;
  }
`;

const _Summary = styled.div`
  margin-right: 48px;
`;
