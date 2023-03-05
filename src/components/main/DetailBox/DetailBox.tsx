import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Text } from '@team-aliens/design-system';
import { GetStudentDetailResponse } from '@/apis/managers/response';
import { PointItem } from './PointItem';
import { StudentProfile } from './StudentInfo';
import { PointBox } from './PointBox';
import { ModeType } from '@/pages/Home';
import { useStudentPointHistory } from '@/hooks/usePointsApi';
import { useModal } from '@/hooks/useModal';
import { StudentDetailPointList } from './StudentDetailPoint';
import { PointType } from '@/apis/points';

interface PropsType {
  studentId: string[];
  mode: ModeType;
  studentDetail: GetStudentDetailResponse;
  onClickStudent: (id: string) => void;
}

const canDelete = true;

export function DetailBox({
  studentDetail,
  onClickStudent,
  mode,
  studentId,
}: PropsType) {
  const { data: studentPointHistory } = useStudentPointHistory(studentId[0]);
  const { selectModal, closeModal, modalState } = useModal();
  const [currentPointType, setCurrentPointType] = useState<PointType>('ALL');

  return (
    <>
      {mode === 'POINTS' && (
        <_Message margin={['top', 12]} color="gray5" size="bodyL">
          학생 전체 상/벌점 내역은 학생 상세 확인해주세요.
        </_Message>
      )}
      {mode === 'GENERAL' ? (
        <_DetailBox>
          <StudentProfile
            student_id={studentId[0]}
            name={studentDetail.name}
            gcn={studentDetail.gcn}
            sex={studentDetail.sex}
            room_number={studentDetail.room_number}
            profile_image_url={studentDetail.profile_image_url}
          />
          <_PointWrapper>
            <PointBox
              currentPointType={currentPointType}
              setCurrentPointType={setCurrentPointType}
              pointType="BONUS"
              point={studentDetail.bonus_point}
            />
            <PointBox
              currentPointType={currentPointType}
              setCurrentPointType={setCurrentPointType}
              pointType="MINUS"
              point={studentDetail.minus_point}
            />
          </_PointWrapper>
          <Text size="bodyS" color="gray6" margin={['top', 40]}>
            동일 호실 학생
          </Text>
          <_MateList>
            {studentDetail.room_mates.map((item) => (
              <Button
                key={item.id}
                kind="outline"
                onClick={() => onClickStudent(item.id)}
                color="gray"
              >
                {item.name}
              </Button>
            ))}
          </_MateList>
          <Text size="bodyS" color="gray6" margin={['top', 40]}>
            상/벌점
          </Text>
          <_PointList>
            {studentPointHistory?.point_histories
              .filter(
                (history) =>
                  history.type === currentPointType ||
                  currentPointType === 'ALL',
              )
              .map((history) => {
                const { point_history_id, name, type, score } = history;
                return (
                  <PointItem
                    key={point_history_id}
                    point_history_id={point_history_id}
                    name={name}
                    type={type}
                    score={score}
                    canDelete={canDelete}
                  />
                );
              })}
          </_PointList>
        </_DetailBox>
      ) : (
        <_PointDetailBox>
          {studentId
            .filter((item) => item !== '' && item !== undefined)
            .map((id) => (
              <StudentDetailPointList key={id} id={id} />
            ))}
        </_PointDetailBox>
      )}
    </>
  );
}
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

const _PointDetailBox = styled.div`
  position: relative;
  width: 309px;
  min-height: 485px;
`;

const _Message = styled(Text)`
  width: 191px;
`;

const _PointItemList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 9px;
`;

const _StudentNameNumber = styled.div`
  display: flex;
  align-items: center;
  margin: 40px 0 7px 0;
  gap: 12px;
`;
