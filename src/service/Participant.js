import axios from "axios";

import { SuccessHandler, errorHandler } from "./helper";

const api = axios.create({
  baseURL: "http://localhost:5500/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const AllStalls = (Credentials) => {
  return api
    .get(`${localStorage.getItem("userType")}/participant/cards`, Credentials)
    .then(SuccessHandler)
    .catch(errorHandler);
};

export const SingleStall = (Credential) => {
  return api
    .get(`${localStorage.getItem("userType")}/participant/card/:id`, Credential)
    .then(SuccessHandler)
    .catch(errorHandler);
};

export const GetByCategory = (data) => {
  return api
    .get(`${localStorage.getItem("userType")}/participant/cards/${data}`)
    .then(SuccessHandler)
    .catch(errorHandler);
};

export const getByCategory = (type) => {
  return api
    .get(`${localStorage.getItem("userType")}/admin/cards/category/${type}`)
    .then(SuccessHandler)
    .catch(errorHandler);
};

export const getAllStallAutomobile = () => {
  return api
    .get("participant/cards/Automobile")
    .then(SuccessHandler)
    .catch(errorHandler);
};
