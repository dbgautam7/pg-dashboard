import axios from "axios";
import { getAuthDetails } from "./cookie";

export const backendApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});
const authDetails = getAuthDetails();
if (authDetails?.token) {
  backendApi.defaults.headers["Authorization"] = `Bearer ${authDetails?.token}`;
}

export default backendApi;
