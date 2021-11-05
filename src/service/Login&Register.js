import axios from "axios";

import { SuccessHandler, errorHandler } from "./helper";

const api = axios.create({
  baseURL: "http://localhost:5500/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const login = (data) =>
  api.post("auth/login", data).then(SuccessHandler).catch(errorHandler);

export const Register = (data) =>
  api.post("auth/register", data).then(SuccessHandler).catch(errorHandler);

export const forgotPassword = (data) =>
  api.post("auth/forgot", data).then(SuccessHandler).catch(errorHandler);

export const resetPassword = (data) =>
  api.patch("auth/reset", data).then(SuccessHandler).catch(errorHandler);
