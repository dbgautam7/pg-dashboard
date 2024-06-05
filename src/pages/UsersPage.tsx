import UserFormModal from "../components/User/UserFormModal";
import UserTable from "../components/User/UserTable";
import { useToast } from "../contexts/ToastContext";
import { useSuperUserOpsMutation } from "../hooks/useMutateData";
import { AddSvg, TableExportSvg } from "../icons/AllSvgs";
import PageWrapper from "../layouts/PageWrapper";

export default function UsersPage() {
  const userMutation = useSuperUserOpsMutation();
  const { updateToast } = useToast();
  const handleCreate = async (data: any) => {
    data.role = ["Super Dashboard Manager"];
    const postData = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      password: data.password,
      role: data.role,
    };
    await userMutation.mutateAsync(["post", "add/", postData]);
    if (userMutation.isSuccess) {
      updateToast("Created account successfully", "success");
    }
    if (userMutation.error) {
      updateToast("error occcures", "error");
    }
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
              handleCreate={handleCreate}
              triggerClassName="btn-primary flex items-center gap-2 py-2 pl-4 pr-6"
            >
              <AddSvg className="h-6" />
              <span>Add User</span>
            </UserFormModal>
          </div>
        </section>
        <UserTable />
      </div>
    </PageWrapper>
  );
}
