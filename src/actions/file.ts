import axios from "axios";
import { BACKEND_BASE_URL } from "../config/general";

export const uploadFile = async (file: any, url: string) => {
  if (file === undefined) return { ok: true };

  var formData = new FormData();

  formData.append("file", file);
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const res = await axios.put(BACKEND_BASE_URL + url, formData, config);

  return (res as any).data as any;
};
