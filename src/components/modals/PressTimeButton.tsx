import { Button } from '@team-aliens/design-system';
import React, { useState, useEffect } from 'react';
import { fetchTimeStateType } from './SetUseTime';

interface BtnPropsType {
  start_time: string;
  end_time: string;
  timeSlotId: string;
  select: string[];
  setSelect: React.Dispatch<React.SetStateAction<string[]>>;
  setFetchTimeState: React.Dispatch<React.SetStateAction<fetchTimeStateType>>;
  default_time_slots_id: string[];
}

export function TimePressButton({
  start_time,
  end_time,
  timeSlotId,
  select,
  setSelect,
  setFetchTimeState,
  default_time_slots_id,
}: BtnPropsType) {
  const [onPress, setOnPress] = useState<boolean>(false);

  const onPush = () => {
    setOnPress(true);
    sliceTime();
    setSelect([...select, timeSlotId]);
    console.log(select);
  };

  const unPush = () => {
    setOnPress(false);
    setSelect(select.filter((id) => id !== timeSlotId));
    console.log(select);
  };

  const sliceTime = () => {
    setFetchTimeState({
      sHState: start_time.slice(0, 2),
      sMState: start_time.slice(3, 5),
      eHState: end_time.slice(0, 2),
      eMState: end_time.slice(3, 5),
    });
  };

  useEffect(() => {
    default_time_slots_id.map((id) => {
      if (timeSlotId) {
        if (timeSlotId === id) {
          setOnPress(true);
          sliceTime();
          setSelect(default_time_slots_id);
        }
      }
    });
  }, []);

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
