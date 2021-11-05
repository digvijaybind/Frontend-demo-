import axios from "axios";

import { SuccessHandler, errorHandler } from "./helper";

// const api = axios.create({
//   baseURL: "http://localhost:5500/",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
// });

export const Stalls = async (Credential) => {
  console.log("Credential:::::::", Credential);
  const formData = new FormData();
  Credential.image.forEach((el) => {
    formData.append("image", el);
  });
  Credential.video.forEach((el) => {
    formData.append("video", el);
  });
  formData.append("logo", Credential.logo);

  delete Credential.image;
  delete Credential.video;
  delete Credential.logo;

  Object.keys(Credential).forEach((key) => {
    formData.append(key, Credential[key]);
  });

  // formData.append("video", Credential.image);
  // formData.append("image", Credential.image);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
    withCredentials: true,
  };
  return await axios
    .post("http://localhost:5500/admin/stallInformation", formData, config)
    .then(SuccessHandler)
    .catch(errorHandler);
};
