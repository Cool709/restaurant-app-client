import axios from "axios";
import { APIs } from "../config/general";

// ====================
// Get comment with specified id: returns comment
// ====================
export const getCommentById = async (id: string) => {
  const result = await axios
    .get(`${APIs.GET_COMMENT_BY_ID}${id}`)
    .catch((err) => {
      console.log(err);

      return { data: { ok: false } };
    });

  return result?.data as any;
};

// ====================
// Get all comments: returns all of comments in database
// ====================
export const getComments = async () => {
  const result = await axios.get(`${APIs.GET_COMMENTS}`).catch((err) => {
    console.log(err);

    return { data: { ok: false } };
  });

  return result?.data as any;
};

// ====================
// Delete comment with specified id
// ====================
export const deleteComment = async (id: string) => {
  const result = await axios
    .delete(`${APIs.DELETE_COMMENT}${id}`)
    .catch((err) => {
      console.log(err);

      return { data: { ok: false } };
    });

  return result?.data as any;
};

// ====================
// Update comment with specified id
// ====================
export const updateComment = async (
  rate: number,
  title: string,
  description: string,
  user: string,
  id: string
) => {
  const result = await axios
    .put(`${APIs.UPDATE_COMMENT}${id}`, {
      rate,
      title,
      description,
      user,
    })
    .catch((err) => {
      console.log(err);

      return { data: { ok: false } };
    });

  return result?.data as any;
};
