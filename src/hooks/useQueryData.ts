import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";

const pageSize = 10;

export const useQueryData = (
  key: string[],
  path: string,
  params = {},
  enabled = true
) => {
  const backendApi = useAxiosPrivate();

  return useQuery({
    queryKey: [key, params],
    refetchOnWindowFocus: false,
    queryFn: () =>
      backendApi
        .get(path, {
          params,
        })
        .then((res) => res.data),
    enabled,
  });
};

export const useUsersData = () => useQueryData(["users"], "/user/userList");

export const useUserInfo = () => useQueryData(["user-info"], "/user/userInfo");

export const useSystemConfigList = () =>
  useQueryData(["system-config-list"], "/ct/systemConfigList");

export const usePaymentInTransactionData = (
  filterValue: string,
  params: any
) => {
  return useQueryData(
    ["payment-in-transaction", filterValue, params],
    `/ct/${
      filterValue === "in"
        ? `list-payment-in-transaction`
        : `list-payment-out-transaction`
    }`,
    params,
    !!filterValue || !!params
  );
};

export const useToggleUserStatus = (id: number | undefined) =>
  useQueryData(["user-status-update"], `/user/updateStatus?id=${id}`, "", !!id);
