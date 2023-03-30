export const dropDownItemArray = (i: number) => {
  return Array(i)
    .fill(void 0)
    .map((_, idx) => `${idx < 10 ? '0' + String(idx) : String(idx)}`);
};
