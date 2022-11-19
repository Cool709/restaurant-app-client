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
