import { useState } from 'react';

export const useObj = <T extends string>(errorTypes: readonly T[]) => {
  type ObjState = {
    [keys in typeof errorTypes[number]]: string;
  };
  const [obj, setObj] = useState<ObjState>();
  const changeObjectValue = (errorType: keyof ObjState, message: string) => {
    setObj({
      ...obj,
      [errorType]: message,
    });
  };
  return {
    obj,
    changeObjectValue,
  };
};
