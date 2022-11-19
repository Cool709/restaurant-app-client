import axios from "axios";
import jwtDecode from "jwt-decode";
import { getAuth } from "../utils/localstorage";
import { setAuthToken } from "../utils/set-auth-token";
import { APIs } from "../config/general";

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
