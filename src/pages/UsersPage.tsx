import { SubmitHandler } from "react-hook-form";
import UserFormModal from "../components/User/UserFormModal";
import UserTable from "../components/User/UserTable";
import { useToast } from "../contexts/ToastContext";
import { useCreateUserMutation } from "../hooks/useMutateData";
import { AddSvg, TableExportSvg } from "../icons/AllSvgs";
import PageWrapper from "../layouts/PageWrapper";
import { IUserData } from "../types";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useExportToExcel } from "../hooks/useQueryData";

export default function UsersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { updateToast } = useToast();
  const { auth } = useAuth();

  const { data } = useExportToExcel();
  const createUserMutation = useCreateUserMutation();
  const handleCreateUser: SubmitHandler<IUserData> = async (data) => {
    await createUserMutation.mutateAsync(["post", "", data], {
      onSuccess: (res) => {
        setIsModalOpen(false);
        updateToast(res?.message, "success");
      },
      onError: (error: any) => {
        const errorMessage = error?.response?.data?.error
          ? error?.response?.data?.error
          : error.message;
        updateToast(errorMessage, "error");
      },
    });
  };

  const hasAddUserPermission = auth.permissions?.some(
    (item) => item.permission_id === 1
  );

  const handleGenerateExcel = () => {
    try {
      const outputFilename = `${Date.now()}.xlsx`;
      const url = URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", outputFilename);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      throw Error(err);
    }
  };

  return (
    <PageWrapper>
      <div className="space-y-6">
        <section className="flex justify-between">
          <h1 className="text-3xl font-semibold text-primary">Users</h1>
          <div className="flex gap-8">
            <button
              onClick={() => handleGenerateExcel()}
              className="btn-secondary flex items-center gap-2 px-4"
            >
              <TableExportSvg className="h-6" />
              <span>Export</span>
            </button>
            <button
              disabled={!hasAddUserPermission}
              onClick={() => setIsModalOpen(true)}
              className="btn-primary disabled:btn-disable flex items-center gap-2 py-2 pl-4 pr-6 disabled:cursor-not-allowed"
            >
              <AddSvg className="h-6" />
              <span>Add User</span>
            </button>
          </div>
        </section>
        <UserTable />
      </div>
      <UserFormModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleCreate={handleCreateUser}
      />
    </PageWrapper>
  );
}
