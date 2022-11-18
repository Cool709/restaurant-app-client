export const validatePassword = (password: string) => {
  return String(password).length >= 6;
};
