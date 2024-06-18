import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import LoadingSvg from "../../assets/loading.svg";
import { IPermissions, IRoles, TypeCheckedPermissions } from "../../types";
import { useCreateRolePermissionsMutation } from "../../hooks/useMutateData";
import { useToast } from "../../contexts/ToastContext";
import Error from "../../components/Shared/Error";
import Table from "../../components/Shared/Table";
import RolesPermissionsFormModal from "./permissionAssignFormModal";
import Tooltip from "../../components/UI/Tooltip";
import { EditSvg } from "../../icons/AllSvgs";

const columnHelper = createColumnHelper<IRoles>();

interface IProps {
  permissionData: IPermissions[];
  roleData: IRoles[];
  isLoading: boolean;
  isError: boolean;
  refetchRoleApi: () => void;
}

export default function RolesPermissionTable({
  permissionData,
  roleData,
  isLoading,
  isError,
  refetchRoleApi,
}: IProps) {
  const [checkedPermissions, setCheckedPermissions] =
    useState<TypeCheckedPermissions>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentRoleId, setCurrentRoleId] = useState<number | null>(null);

  const assignRolePermissionMutation = useCreateRolePermissionsMutation();

  const { updateToast } = useToast();

  useEffect(() => {
    if (!isLoading && roleData) {
      const defaultPermissions: TypeCheckedPermissions = {};
      roleData?.forEach((role: IRoles) => {
        defaultPermissions[role?.role_id] =
          role?.permissions?.map((item) => item?.permission_id) || [];
      });
      setCheckedPermissions(defaultPermissions);
    }
  }, [isLoading, isError, roleData]);

  const handleAssignRolePermissions = async (roleId: number) => {
    const rolePermissions = checkedPermissions?.[roleId]?.sort();
    await assignRolePermissionMutation.mutateAsync(
      ["post", roleId, { permissions: rolePermissions }],
      {
        onSuccess: (res) => {
          updateToast(res?.message, "success");
          setIsModalOpen(false);
          refetchRoleApi();
        },
        onError: (error: any) => {
          const errorMessage = error?.response?.data?.error
            ? error?.response?.data?.error
            : error.message;
          updateToast(errorMessage, "error");
        },
      }
    );
  };

  const handleCheckboxChange = (roleId: number, permissionId: number) => {
    setCheckedPermissions((prevState: TypeCheckedPermissions) => {
      const rolePermissions = prevState[roleId] || [];
      const newPermissions = rolePermissions?.includes(permissionId)
        ? rolePermissions?.filter(
            (id: number | undefined) => id !== permissionId
          )
        : [...rolePermissions, permissionId];
      return {
        ...prevState,
        [roleId]: newPermissions,
      };
    });
  };

  const openModal = (roleId: number) => {
    setCurrentRoleId(roleId);
    setIsModalOpen(true);
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("role_id", {
        header: "Id",
      }),
      columnHelper.accessor("role_name", {
        header: "Role",
        id: "role_name",
        cell: ({ row }) => (
          <p className="capitalize">{row.original.role_name}</p>
        ),
      }),

      columnHelper.accessor("permissions", {
        header: "Permissions",
        id: "permissions",
        cell: ({ row }) => {
          const permissions = row?.original?.permissions?.sort(
            (a, b) =>
              (a?.permission_id as number) - (b?.permission_id as number)
          );
          return (
            <ul className="space-y-2">
              {permissions?.map((item) => {
                return (
                  <li key={item.permission_id} className="whitespace-nowrap">
                    {item.permission_name as string}
                  </li>
                );
              })}
            </ul>
          );
        },
      }),

      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          return (
            <div className="flex items-start gap-4">
              <RolesPermissionsFormModal
                hasPermissions={
                  row?.original?.permissions?.length ? true : false
                }
                data={permissionData && permissionData}
                handleAssign={() =>
                  handleAssignRolePermissions(row.original.role_id)
                }
                triggerClassName="cursor-pointer text-grayHeading hover:text-primary"
                roleId={row.original.role_id}
                handleCheckBoxChange={handleCheckboxChange}
                checkedPermissions={checkedPermissions}
                isModalOpen={
                  isModalOpen && currentRoleId === row.original.role_id
                }
                setIsModalOpen={setIsModalOpen}
              >
                <Tooltip content="Edit Permissions" asChild>
                  <span onClick={() => openModal(row.original.role_id)}>
                    <EditSvg className="h-6" />
                  </span>
                </Tooltip>
              </RolesPermissionsFormModal>
            </div>
          );
        },
      }),
    ],
    [isModalOpen, currentRoleId, checkedPermissions]
  );

  return (
    <section>
      {isLoading ? (
        <img
          src={LoadingSvg}
          className="mx-auto mt-4 h-28"
          alt="Loading Spinner"
        />
      ) : isError ? (
        <Error />
      ) : (
        <Table
          data={roleData}
          columns={columns || []}
          isError={isError}
          isLoading={isLoading}
          totalEntries={1}
          containsActions
          currentPage={1}
          showFooter
        />
      )}
    </section>
  );
}
