import styled from 'styled-components';
import {
  DropDown,
  SegmentedBtn,
  Input,
  Button,
} from '@team-aliens/design-system';
import { ChangeEvent } from 'react';
import { GradeType, SexType } from '@/apis/studyRooms/request';
import {
  gradeTypeToKorean,
  SexToKorean,
  sexTypeToKorean,
} from '@/utils/translate';

const sex = ['ALL', 'MALE', 'FEMALE'].map((i: SexType) => sexTypeToKorean(i));

const grade = [0, 1, 2, 3].map((i: GradeType) => gradeTypeToKorean(i));

interface PropsType {
  onChangeSegmented: (sex: SexToKorean) => void;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeStudyTime: (times_id: string[]) => void;
  west_description: string;
  east_description: string;
  north_description: string;
  south_description: string;
  available_grade: GradeType;
  available_sex: SexType;
  onChangeGrade: (grade: string & GradeType) => void;
  createStudyRoom: () => void;
  patch?: boolean;
}

export function CreateStudyRoomDetailOptions({
  onChangeSegmented,
  onChangeInput,
  onChangeStudyTime,
  west_description,
  east_description,
  north_description,
  south_description,
  available_sex,
  available_grade,
  onChangeGrade,
  createStudyRoom,
  patch,
}: PropsType) {
  return (
    <_Wrapper>
      <SegmentedBtn
        selectedArr={sex}
        cur={sexTypeToKorean(available_sex)}
        onChange={onChangeSegmented}
      />
      <DropDown
        items={grade}
        placeholder="모든 학년"
        onChange={onChangeGrade}
        label="신청 가능 학년"
        value={gradeTypeToKorean(available_grade)}
        margin={['top', 20]}
      />
      <_ColumWrapper>
        <Input
          onChange={onChangeInput}
          name="east_description"
          value={east_description}
          placeholder="ex) 동쪽"
          width={160}
          label="동쪽"
        />
        <Input
          onChange={onChangeInput}
          name="west_description"
          value={west_description}
          placeholder="ex) 서쪽"
          width={160}
          margin={['left', 10]}
          label="서쪽"
        />
      </_ColumWrapper>
      <_RowWrapper>
        <Input
          onChange={onChangeInput}
          name="south_description"
          value={south_description}
          placeholder="ex) 남쪽"
          width={160}
          label="남쪽"
        />
        <Input
          onChange={onChangeInput}
          name="north_description"
          value={north_description}
          placeholder="ex) 북쪽"
          width={160}
          margin={['left', 10]}
          label="북쪽"
        />
      </_RowWrapper>
      <Button
        color="primary"
        kind="contained"
        margin={[
          ['left', 'auto'],
          ['top', 'auto'],
        ]}
        onClick={createStudyRoom}
      >
        {patch ? '자습실 수정' : '자습실 생성'}
      </Button>
<<<<<<< refs/remotes/origin/releases/study-rooms
=======
      {modal && (
        <SetUseTimeModal
          close={() => setModal(false)}
          createStudyRoom={createStudyRoom}
          onChangeStudyTime={onChangeStudyTime}
        />
      )}
>>>>>>> fix: 자습실 생성 API 수정
    </_Wrapper>
  );
}

const _Wrapper = styled.div`
  margin-left: 16px;
  display: flex;
  flex-direction: column;
`;
const _ColumWrapper = styled.div`
  display: flex;
  margin-top: 32px;
`;

const _RowWrapper = styled.div`
  display: flex;
  margin-top: 18px;
`;
