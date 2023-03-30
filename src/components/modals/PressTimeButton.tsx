import { usePatchStudyTime } from '@/apis/studyRooms';
import { Button } from '@team-aliens/design-system';
import React, { useState } from 'react';

interface BtnPropsType {
  start_time: string;
  end_time: string;
  timeSlotId: string;
  select: string[];
  setSelect: React.Dispatch<React.SetStateAction<string[]>>;
}

export function TimePressButton({
  start_time,
  end_time,
  timeSlotId,
  select,
  setSelect,
}: BtnPropsType) {
  const [onPress, setOnPress] = useState<boolean>(false);

  const onPush = () => {
    setOnPress(true);
    setSelect([...select, timeSlotId]);
  };

  const unPush = () => {
    setOnPress(false);
    setSelect(select.filter((id) => id !== timeSlotId));
  };

  return (
    <Button
      kind={onPress ? 'contained' : 'outline'}
      color={onPress ? 'primary' : 'gray'}
      onClick={onPress ? unPush : onPush}
    >
      {start_time + ' ~ ' + end_time}
    </Button>
  );
}
