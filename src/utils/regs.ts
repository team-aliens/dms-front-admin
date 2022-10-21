export const checkPasswordReg = (password: string): boolean => {
  const reg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*+=-])(?=.*[0-9]).{8,20}$/;
  return reg.test(password);
};
