export const setAuth = (token: string) => {
  localStorage.setItem("auth", token);
};

export const getAuth = () => {
  return localStorage.getItem("auth");
};
