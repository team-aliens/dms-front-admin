import { useState } from 'react';
import styled from 'styled-components';
import { Button, Text } from '@team-aliens/design-system';
import { GetStudentDetailResponse } from '@/apis/managers/response';
import { PointItem } from './PointItem';
import { StudentProfile } from './StudentInfo';
import { PointBox } from './PointBox';
import { PointType } from '@/apis/points';
import { StudentPointHistoryResponse } from '@/apis/points/response';
import { Tag } from '../Tag';
import { IsUseAbleFeature } from '@/apis/auth/response';

interface PropsType {
  studentPointHistory: StudentPointHistoryResponse;
  studentId: string[];
  studentDetail: GetStudentDetailResponse;
  onClickStudent: (id: string) => void;
  availableFeature: IsUseAbleFeature;
}

const canDelete = true;

export function DetailBox({
  studentPointHistory,
  studentDetail,
  onClickStudent,
  studentId,
  availableFeature,
}: PropsType) {
  const [currentPointType, setCurrentPointType] = useState<PointType>('ALL');

  return (
    <>
      <_DetailBox>
        <StudentProfile
          student_id={studentId[0]}
          name={studentDetail.name}
          gcn={studentDetail.gcn}
          sex={studentDetail.sex}
          room_number={studentDetail.room_number}
          profile_image_url={studentDetail.profile_image_url}
        />
        {availableFeature?.point_service && (
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
        )}
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
          학생 태그
        </Text>
        <_MateList>
          {studentDetail.tags?.map((tag) => {
            return (
              <Tag
                key={tag.id}
                id={tag.id}
                name={tag.name}
                color={tag.color}
                canHover={true}
              />
            );
          })}
        </_MateList>
        {availableFeature?.point_service && (
          <>
            <Text size="bodyS" color="gray6" margin={['top', 40]}>
              상/벌점
            </Text>
            <_PointList>
              {studentPointHistory?.point_histories &&
                studentPointHistory.point_histories
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
          </>
        )}
      </_DetailBox>
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
