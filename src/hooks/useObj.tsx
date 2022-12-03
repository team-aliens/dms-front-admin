import { useState } from 'react';

export const useObj = <T extends object>(initialState: T) => {
  const [obj, setObj] = useState<T>(initialState);

  const changeObjectValue = (errorType: keyof T, message: string) => {
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
