import React, { useState } from "react";
import PageWrapper from "../../layouts/PageWrapper";
import Checkbox from "../../components/UI/Checkbox";
import { useRolesData, useUsersPermissionData } from "../../hooks/useQueryData";
import LoadingSvg from "../../assets/loading.svg";
import Error from "../../components/Shared/Error";
import { useCreateRolePermissionsMutation } from "../../hooks/useMutateData";
import { useToast } from "../../contexts/ToastContext";

type CheckedPermissions = {
  [roleId: number]: number[];
};

export default function PermissionsPage() {
  const [checkedPermissions, setCheckedPermissions] =
    useState<CheckedPermissions>({
      1: [1, 2],
      2: [],
    });

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
    setCheckedPermissions((prevState: any) => {
      const rolePermissions = prevState[roleId] || [];
      const newPermissions = rolePermissions?.includes(permissionId)
        ? rolePermissions?.filter((id: number) => id !== permissionId)
        : [...rolePermissions, permissionId];
      return {
        ...prevState,
        [roleId]: newPermissions,
      };
    });
  };
  console.log(checkedPermissions, "cje");
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
          <ol className="">
            {roles.map((role: any) => {
              return (
                <li
                  className="capitalize text-lg font-semibold flex flex-col gap-6"
                  key={role.id}
                >
                  <section className="flex gap-1">
                    <p>{role.id}.</p>
                    <p>{role.name}</p>
                  </section>
                  <section className="ml-6 space-y-8">
                    {permissions.map((permission: any) => {
                      return (
                        <Checkbox
                          key={permission.id}
                          label={permission?.name}
                          value={permission?.id || ""}
                          checked={checkedPermissions?.[role.id]?.includes(
                            permission.id
                          )}
                          handleChange={() =>
                            handleCheckboxChange(role.id, permission.id)
                          }
                        />
                      );
                    })}
                  </section>
                  <button
                    onClick={() => {
                      handleAssignRolePermissions(role.id);
                    }}
                    type="submit"
                    className="btn-primary px-6 py-2 mb-4 place-self-start"
                  >
                    {role?.permissions?.length
                      ? "Update Permission"
                      : "Assign Permission"}
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
