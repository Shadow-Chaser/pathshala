// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";

export const authenticate = (token) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("access_token", JSON.stringify(token));
  }
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;
  if (localStorage.getItem("access_token")) {
    const { exp } = jwt_decode(JSON.parse(localStorage.getItem("access_token")));
    if (new Date().getTime() <= exp * 1000) {
      return true;
    }
    localStorage.removeItem("access_token");
    return false;
  }
  return false;
};

export const userInfo = () => {
  const jwt = JSON.parse(localStorage.getItem("access_token"));
  const decoded = jwt_decode(jwt);
  return { ...decoded, token: jwt };
};

export const singOut = (cb) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");
    cb();
  }
};
