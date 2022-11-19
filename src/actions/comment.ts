import axios from "axios";
import { APIs } from "../config/general";

export const getCommentById = async (id: string) => {
  const result = await axios
    .get(`${APIs.GET_COMMENT_BY_ID}${id}`)
    .catch((err) => {
      console.log(err);

      return { data: { ok: false } };
    });

  return result?.data as any;
};
