import axios from "axios";
import jwtDecode from "jwt-decode";
import { getAuth } from "../utils/localstorage";
import { setAuthToken } from "../utils/set-auth-token";
import { APIs } from "../config/general";

// ====================
// User sign up action: returns registered user
// ====================
export const signUpAction = async (
  name: string,
  email: string,
  password: string,
  role: string
) => {
  const res = await axios
    .post(APIs.REGISTER_API, {
      name,
      email,
      password,
      role,
    })
    .catch((err) => {
      console.log(err);

      return { data: { ok: false } };
    });

  return (res as any).data as any;
};

// ====================
// User sign in action: returns logged user
// ====================
export const signInAction = async (email: string, password: string) => {
  const res = await axios
    .post(APIs.LOGIN_API, {
      email,
      password,
    })
    .catch((err) => {
      console.log(err);

      return { data: { ok: false } };
    });

  return (res as any).data as any;
};

// ====================
// Get currently logged user: check localstorage and decode it using jwt-decode
// ====================
export const getCurrentUser = () => {
  if (getAuth() !== "") setAuthToken(getAuth());
  else return { ok: false };

  try {
    const decoded: any = jwtDecode(String(getAuth()));

    return decoded as any;
  } catch (err) {
    return { ok: false };
  }
};
