import { ChangeEvent, useState } from 'react';

export const useForm = <T>(initalState: T) => {
  const [state, setState] = useState<T>(initalState);

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
