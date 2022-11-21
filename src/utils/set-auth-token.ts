import axios from "axios";
import { setAuth } from "./localstorage";

// ====================
// save auth to axios and localstorage
// ====================
export const setAuthToken = (token: string | null) => {
  if (token === null) {
    delete axios.defaults.headers.common["Authorization"];
    setAuth("");
  } else {
    axios.defaults.headers.common["Authorization"] = token;
    setAuth(token);
  }
};
