import axios from "axios";

export const uploadFile = async (file: any, url: string) => {
  if (file === undefined) return { ok: true };

  var formData = new FormData();

  formData.append("file", file);
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const res = await axios.put(url, formData, config);

  return (res as any).data as any;
};
