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
  const user = getCurrentUser();
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

export const leaveComment = async (
  rate: number,
  title: string,
  description: string,
  restaurant: string
) => {
  const user = getCurrentUser();
  console.log(user.user);

  const result = await axios
    .post(`${APIs.LEAVE_COMMENT}`, {
      owner: user._id,
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
