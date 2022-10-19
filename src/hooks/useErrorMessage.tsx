import { useEffect, useState } from 'react';

export const useErrorMessage = <T extends string>(errorTypes: readonly T[]) => {
  type ErrorState = {
    [keys in typeof errorTypes[number]]: string;
  };
  const [errorMessages, setErrorMessages] = useState<ErrorState>();
  useEffect(() => {
    errorTypes.forEach((i) => {
      setErrorMessages({
        ...errorMessages,
        [i]: '',
      });
    });
  }, [errorTypes]);
  const changeErrorMessage = (errorType: keyof ErrorState, message: string) => {
    setErrorMessages({
      ...errorMessages,
      [errorType]: message,
    });
  };
  return {
    errorMessages,
    changeErrorMessage,
  };
};
