import { ChangeEvent, useState } from 'react';

export const useForm = <T>(initialState: T) => {
  const [state, setState] = useState<T>(initialState);

  const onHandleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { value, name } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  return { onHandleChange, state };
};
