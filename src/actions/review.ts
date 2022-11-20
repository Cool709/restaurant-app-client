import axios from "axios";
import { APIs } from "../config/general";

export const validateCreateReviewFields = (reply: string) => {
  if (reply === "") return false;
  return true;
};

export const replyToComment = async (
  reply: string,
  comment: string,
  owner: string
) => {
  const result = await axios
    .post(`${APIs.CREATE_REVIEW}`, {
      owner,
      description: reply,
      comment,
    })
    .catch((err) => {
      console.log(err);

      return { data: { ok: false } };
    });

  return result?.data as any;
};

export const deleteReview = async (id: string, commentId: string) => {
  const result = await axios
    .delete(`${APIs.DELETE_REVIEW}${id}`, { params: { comment: commentId } })
    .catch((err) => {
      console.log(err);

      return { data: { ok: false } };
    });

  console.log(result);

  return result?.data as any;
};

export const updateReview = async (id: string, description: string) => {
  const result = await axios
    .put(`${APIs.UPDATE_REVIEW}${id}`, { description })
    .catch((err) => {
      console.log(err);

      return { data: { ok: false } };
    });

  console.log(result);

  return result?.data as any;
};
