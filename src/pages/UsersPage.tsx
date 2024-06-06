import { SubmitHandler } from "react-hook-form";
import UserFormModal from "../components/User/UserFormModal";
import UserTable from "../components/User/UserTable";
import { useToast } from "../contexts/ToastContext";
import { useCreateUserMutation } from "../hooks/useMutateData";
import { AddSvg, TableExportSvg } from "../icons/AllSvgs";
import PageWrapper from "../layouts/PageWrapper";
import { IUserData } from "../types";
import { useState } from "react";

export default function UsersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { updateToast } = useToast();

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

  return (
    <PageWrapper>
      <div className="space-y-6">
        <section className="flex justify-between">
          <h1 className="text-3xl font-semibold text-primary">Users</h1>
          <div className="flex gap-8">
            <button className="btn-secondary flex items-center gap-2 px-4">
              <TableExportSvg className="h-6" />
              <span>Export</span>
            </button>
            <UserFormModal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              handleCreate={handleCreateUser}
              triggerClassName="btn-primary flex items-center gap-2 py-2 pl-4 pr-6"
            >
              <AddSvg className="h-6" />
              <span onClick={() => setIsModalOpen(true)}>Add User</span>
            </UserFormModal>
          </div>
        </section>
        <UserTable />
      </div>
    </PageWrapper>
  );
}
