export const dateToString = (date: Date) => {
  const newDate = new Date(date);
  return `${newDate.getFullYear()}/${newDate.getMonth()}/${newDate.getDay()}`;
};
