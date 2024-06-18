import PageWrapper from "../../layouts/PageWrapper";
import { useRolesData, useUsersPermissionData } from "../../hooks/useQueryData";
import RolesPermissionTable from "./rolePermissionTable";

export default function RolesPermissionsPage() {
  const {
    data: permissions,
    isError: permissionError,
    isLoading: permissionLoading,
  } = useUsersPermissionData();

  const {
    data: roles,
    isError: roleError,
    isLoading: roleLoading,
    refetch,
  } = useRolesData();

  return (
    <PageWrapper>
      <div className="space-y-6">
        <section className="flex justify-between">
          <h1 className="text-3xl font-semibold text-primary">Roles</h1>
        </section>
        <RolesPermissionTable
          permissionData={permissions}
          roleData={roles}
          isLoading={permissionLoading || roleLoading}
          isError={permissionError || roleError}
          refetchRoleApi={refetch}
        />
      </div>
    </PageWrapper>
  );
}
