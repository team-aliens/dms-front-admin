import { ChangeEvent, useState } from 'react';

export const useDropDown = <T>(initalState: T) => {
  const [sort, setSort] = useState<T>(initalState);
  const onDropDownChange = (value: T) => {
    setSort(value);
  };
  return {
    onDropDownChange,
    sort,
  };
};
