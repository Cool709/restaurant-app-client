// ********************
// Localstorage management
// ********************

// ====================
// Set auth
// ====================
export const setAuth = (token: string) => {
  localStorage.setItem("auth", token);
};

// ====================
// Get auth
// ====================
export const getAuth = () => {
  return localStorage.getItem("auth");
};
