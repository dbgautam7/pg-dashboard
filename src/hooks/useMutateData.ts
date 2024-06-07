import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import useAxiosPrivate from "./useAxiosPrivate";

export const useMutate = (
  queryKey: string[],
  basePath: string,
  contentType = "application/json"
) => {
  const queryClient = useQueryClient();
  const backendApi = useAxiosPrivate();
  return useMutation({
    mutationFn: async (params: any[]) => {
      const response = await backendApi({
        method: params[0],
        url: basePath + params[1],
        data: params[2],
        headers: {
          "Content-Type": contentType,
        },
      });
      return response?.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    onError: (err: AxiosError) => {
      return err?.response?.data;
    },
  });
};

export const useChangePasswordMutation = () =>
  useMutate(["change-password"], "/user/changePassword");

export const useCreateUserMutation = () =>
  useMutate(["user-profile"], "/user/create");

export const useUpdateProfileMutation = (id: number | undefined) =>
  useMutate(["user-profile"], `/user/update/${id}`);
