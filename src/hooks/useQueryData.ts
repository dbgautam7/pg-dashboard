import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";

const pageSize = 10;

export const useQueryData = (
  key: string[],
  path: string,
  params = "",
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

export const useUsersData = () => useQueryData(["users"], "/user/user-list");

export const useUserInfo = () => useQueryData(["user-info"], "/user/user-info");

export const useSystemConfigList = () =>
  useQueryData(["system-config-list"], "/ct/system-config-list");

export const usePaymentInTransactionData = (
  filterValue: string | number | undefined
) =>
  useQueryData(
    ["payment-in-transaction"],
    `/ct/${
      filterValue === "in"
        ? "list-payment-in-transaction"
        : "list-payment-out-transaction"
    }`,
    "",
    !!filterValue
  );

export const usePaymentOutTransactionData = () =>
  useQueryData(["payment-out-transaction"], "/ct/list-payment-out-transaction");

export const useToggleUserStatus = (id: number | undefined) =>
  useQueryData(["user-status-update"], `/user/updateStatus?id=${id}`, "", !!id);
