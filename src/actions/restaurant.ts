import axios from "axios";
import { getCurrentUser } from "./auth";
import { APIs } from "../config/general";
import { ROLE } from "../constants/constants";

export const getRestaurntsByRate = async (from: number, rate: number) => {
  const results = await axios
    .get(APIs.GET_RESTAURANTS_BY_RATE, { params: { from, rate } })
    .catch((err) => {
      console.log(err);

      return { data: { ok: false } };
    });

  return results?.data as any;
};

export const getRestaurantsByOwner = async (owner: string) => {
  const results = await axios
    .get(APIs.GET_RESTAURANTS_BY_OWNER, { params: { owner } })
    .catch((err) => {
      console.log(err);

      return { data: { ok: false } };
    });

  return results?.data as any;
};

export const getRestaurantsWithWaitingList = async (owner: string) => {
  const results = await axios
    .get(APIs.GET_RESTAURANTS_WAITING_LIST, { params: { owner } })
    .catch((err) => {
      console.log(err);

      return { data: { ok: false } };
    });

  return results?.data as any;
};

export const getRestaurantById = async (id: string) => {
  const result = await axios
    .get(`${APIs.GET_RESTAURANT_BY_ID}${id}`)
    .catch((err) => {
      console.log(err);

      return { data: { ok: false } };
    });

  return result?.data as any;
};

export const commentAble = (comments: any[]) => {
  const { user } = getCurrentUser();
  if (user.role === ROLE.owner) return false;

  var found = false;
  comments.forEach((comment) => {
    if (comment.user._id === user._id) found = true;
  });

  return !found;
};

export const validateLeaveCommentFields = (
  title: string,
  description: string
) => {
  if (title === "" || description === "") return false;
  return true;
};

export const validateCreateRestaurantFields = (
  name: string,
  description: string
) => {
  if (name === "" || description === "") return false;
  return true;
};

export const leaveComment = async (
  rate: number,
  title: string,
  description: string,
  restaurant: string,
  owner: string
) => {
  const result = await axios
    .post(`${APIs.LEAVE_COMMENT}`, {
      owner,
      rate,
      title,
      description,
      restaurant,
    })
    .catch((err) => {
      console.log(err);

      return { data: { ok: false } };
    });

  return result?.data as any;
};

export const createRestaurant = async (
  name: string,
  description: string,
  owner: string
) => {
  const result = await axios
    .post(`${APIs.CREATE_RESTAURANT}`, {
      owner,
      name,
      description,
    })
    .catch((err) => {
      console.log(err);

      return { data: { ok: false } };
    });

  return result?.data as any;
};
