import { useEffect } from "react";
import { backendApi } from "../utils/axios";
import { useAuth } from "../contexts/AuthContext";

export default function useAxiosPrivate() {
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = backendApi.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"] && auth?.token) {
          config.headers["Authorization"] = `Bearer ${auth?.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      backendApi.interceptors.request.eject(requestIntercept);
    };
  }, [auth.token]);

  return backendApi;
}
