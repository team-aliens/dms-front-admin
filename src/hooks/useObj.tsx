import { useState } from 'react';

export const useObj = <T extends object>(initialState: T) => {
  const [obj, setObj] = useState<T>(initialState);

  const changeObjectValue = (name: keyof T, value: string) => {
    setObj((prev: T) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    console.log(name, value);
    console.log(obj);
  };
  return {
    obj,
    changeObjectValue,
  };
};
