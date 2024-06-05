import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import backendApi from "../utils/axios";

export const useMutateData = (
  queryKey: string[],
  method: string,
  path: string
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      fetch(
        import.meta.env.VITE_BACKEND_BASE_URL +
          path +
          (data.idx ? data.idx + "/" : ""),
        {
          method,
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        }
      ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });
};

export const useMutate = (queryKey: string[], basePath: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: any[]) => {
      const response = await backendApi({
        method: params[0],
        url: basePath + params[1],
        data: params[2],
      });
      return response?.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    onError: (err: AxiosError) => {
      return err?.response?.data;
    },
  });
};

export const useSuperInterventionMutation = () =>
  useMutate(["interventions"], "super-dashboard/intervention/");

export const useSuperUserOpsMutation = () =>
  useMutate(["users"], "super-dashboard/user/");
