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

export const useUsersData = (params: any) =>
  useQueryData(["users"], "/user/userList", params, !!params);

export const useUsersPermissionData = () =>
  useQueryData(["users-permission"], "/user/permissionList");

export const useRolesData = () => useQueryData(["roles"], "/user/roleList");

export const useUserInfo = () => useQueryData(["user-info"], "/user/userInfo");

export const useSystemConfigList = () =>
  useQueryData(["system-config-list"], "/ct/systemConfigList");

export const useTransactionData = (
  filterValue: string | undefined,
  params: any
) => {
  return useQueryData(
    ["transactions", filterValue, params],
    `/ct/${
      filterValue === "deposit"
        ? `list-payment-in-transaction`
        : `list-payment-out-transaction`
    }`,
    params,
    !!filterValue || !!params
  );
};

export const useToggleUserStatus = (id: number | undefined) =>
  useQueryData(["user-status-update"], `/user/updateStatus?id=${id}`, "", !!id);

export const useExportToExcel = () =>
  useQueryData(["export-to-excel"], "/ct/exportToExcel");
