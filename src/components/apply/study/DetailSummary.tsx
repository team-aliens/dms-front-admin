import { Button, Text } from '@team-aliens/design-system';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { gradeTypeToKorean, sexTypeToKorean } from '@/utils/translate';
import { GradeType, SexType } from '@/apis/studyRooms/request';
import { StudyRoomDetailResponse } from '@/apis/studyRooms/response';
import { pagePath } from '@/utils/pagePath';

interface DetailOption {
  name: string;
  value:
    | 'total_available_seat'
    | 'available_sex'
    | 'available_grade'
    | 'floor'
    | 'name';
  func: (item: number | SexType | GradeType | string) => unknown;
}

const detailOptions: DetailOption[] = [
  {
    name: '자습실 층',
    value: 'floor',
    func: (item: number) => `${item}층`,
  },
  {
    name: '자습실 이름',
    value: 'name',
    func: (item: string) => item,
  },
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
  timeSlotId: string;
}

export function StudyRoomDetailSummary({
  detail,
  id,
  selectModal,
  timeSlotId,
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
      <Link to={pagePath.apply.studyRoom.patch(id)} state={{ timeSlotId }}>
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
  > a {
    margin-left: auto;
  }
`;

const _Summary = styled.div`
  margin-right: 48px;
`;
