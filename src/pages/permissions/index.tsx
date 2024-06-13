import { useEffect, useState } from "react";
import PageWrapper from "../../layouts/PageWrapper";
import Checkbox from "../../components/UI/Checkbox";
import { useRolesData, useUsersPermissionData } from "../../hooks/useQueryData";
import LoadingSvg from "../../assets/loading.svg";
import Error from "../../components/Shared/Error";
import { useCreateRolePermissionsMutation } from "../../hooks/useMutateData";
import { useToast } from "../../contexts/ToastContext";
import { IPermissions, IRoles } from "../../types";

type CheckedPermissions = {
  [roleId: number]: (number | undefined)[];
};

export default function PermissionsPage() {
  const [checkedPermissions, setCheckedPermissions] =
    useState<CheckedPermissions>({});

  const {
    data: permissions,
    isError: permissionError,
    isLoading: permissionLoading,
  } = useUsersPermissionData();

  const {
    data: roles,
    isError: roleError,
    isLoading: roleLoading,
  } = useRolesData();

  const assignRolePermissionMutation = useCreateRolePermissionsMutation();

  const { updateToast } = useToast();

  useEffect(() => {
    if (!roleLoading && !roleError && roles) {
      const defaultPermissions: CheckedPermissions = {};
      roles?.forEach((role: IRoles) => {
        defaultPermissions[role?.role_id] =
          role?.permissions?.map((item) => item?.permission_id) || [];
      });
      setCheckedPermissions(defaultPermissions);
    }
  }, [roleLoading, roleError, roles]);

  const handleAssignRolePermissions = async (roleId: number) => {
    const rolePermissions = checkedPermissions?.[roleId]?.sort();
    await assignRolePermissionMutation.mutateAsync(
      ["post", roleId, { permissions: rolePermissions }],
      {
        onSuccess: (res) => {
          updateToast(res?.message, "success");
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
    setCheckedPermissions((prevState: CheckedPermissions) => {
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
  return (
    <PageWrapper>
      <h1 className="mb-8 text-3xl font-semibold text-primary">Permissions</h1>
      <section>
        {permissionLoading || roleLoading ? (
          <img
            src={LoadingSvg}
            className="mx-auto mt-4 h-28"
            alt="Loading Spinner"
          />
        ) : permissionError || roleError ? (
          <Error />
        ) : (
          <ol>
            {roles?.map((role: IRoles) => {
              return (
                <li
                  className="capitalize text-lg font-semibold flex flex-col gap-6"
                  key={role?.role_id}
                >
                  <section className="flex gap-1">
                    <p>{role?.role_id}.</p>
                    <p>{role?.role_name}</p>
                  </section>
                  <section className="ml-6 space-y-8">
                    {permissions?.map((permission: IPermissions) => {
                      return (
                        <Checkbox
                          key={permission?.id}
                          label={permission?.name}
                          value={permission?.id?.toString() || ""}
                          checked={
                            !!checkedPermissions?.[role?.role_id]?.includes(
                              permission?.id
                            )
                          }
                          handleChange={() =>
                            handleCheckboxChange(role?.role_id, permission?.id)
                          }
                        />
                      );
                    })}
                  </section>
                  <button
                    onClick={() => {
                      handleAssignRolePermissions(role.role_id);
                    }}
                    type="submit"
                    className="btn-primary px-6 py-2 mb-4 place-self-start"
                  >
                    {role?.permissions?.length
                      ? `Update ${role?.role_name} Permission`
                      : `Assign  ${role?.role_name} Permission`}
                  </button>
                </li>
              );
            })}
          </ol>
        )}
      </section>
    </PageWrapper>
  );
}
