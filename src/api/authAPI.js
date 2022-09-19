import axios from "axios";
import { API } from "../utils/config";

export const signUp = (user) => {
  return axios.post(`${API}/user/signup`, user, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const signIn = (user) => {
  return axios.post(`${API}/user/signin`, user, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
