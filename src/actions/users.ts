import axios from "axios";
import { APIs } from "../config/general";

export const getAllUsers = async () => {
  const results = await axios.get(APIs.GET_USERS).catch((err) => {
    console.log(err);

    return { data: { ok: false } };
  });

  return results?.data as any;
};

export const validateUserFields = (
  name: string,
  email: string,
  role: string
) => {
  if (name === "" || email === "" || role === "") return false;
  return true;
};

export const updateUser = async (
  name: string,
  email: string,
  role: string,
  id: string
) => {
  const result = await axios
    .put(`${APIs.UPDATE_USER}${id}`, { name, email, role })
    .catch((err) => {
      console.log(err);

      return { data: { ok: false } };
    });

  return result?.data as any;
};

export const deleteUser = async (id: string) => {
  const result = await axios.delete(`${APIs.DELETE_USER}${id}`).catch((err) => {
    console.log(err);

    return { data: { ok: false } };
  });

  return result?.data as any;
};

export const getUserById = async (id: string) => {
  const result = await axios.get(`${APIs.GET_USER_BY_ID}${id}`).catch((err) => {
    console.log(err);

    return { data: { ok: false } };
  });

  return result?.data as any;
};
