import Cookies from "universal-cookie";
import {
  // ACCESS_TOKEN_NAME,
  // REFRESH_TOKEN_NAME,
  cookieAuthKey,
} from "./constants";
import { IAuthDetails } from "../types";

const cookie = new Cookies();
export const getAuthDetails = () => cookie.get(cookieAuthKey);

// export const getAccessToken = () => cookie.get(ACCESS_TOKEN_NAME);
// export const getRefreshToken = () => cookie.get(REFRESH_TOKEN_NAME);

export const removeAuthDetails = () =>
  cookie.remove(cookieAuthKey, {
    domain: window.location.hostname,
    path: "/",
  });
// export const removeAccessToken = () =>
//   cookie.remove(ACCESS_TOKEN_NAME, {
//     domain: window.location.hostname,
//     path: "/",
//   });
// export const removeRefreshToken = () =>
//   cookie.remove(REFRESH_TOKEN_NAME, {
//     domain: window.location.hostname,
//     path: "/",
//   });

export const setAuthDetails = (authDetails: IAuthDetails) => {
  cookie.set(cookieAuthKey, authDetails, {
    domain: window.location.hostname,
    path: "/",
    secure: true,
    sameSite: true,
    expires: undefined,
  });
};

// export const setAccessToken = (accessToken: string) => {
//   cookie.set(ACCESS_TOKEN_NAME, accessToken, {
//     domain: window.location.hostname,
//     path: "/",
//     secure: true,
//     sameSite: true,
//     expires: undefined,
//   });
// };

// export const setRefreshToken = (refreshToken: string) => {
//   const now = new Date();
//   now.setDate(now.getDate() + 25);
//   cookie.set(REFRESH_TOKEN_NAME, refreshToken, {
//     domain: window.location.hostname,
//     path: "/",
//     secure: true,
//     sameSite: true,
//     expires: now,
//   });
// };

export default cookie;
