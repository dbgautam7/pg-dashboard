import PageWrapper from "../../layouts/PageWrapper";

import PostTable from "../../components/Posts/PostTable";

export default function InterventionDetail() {
  return (
    <PageWrapper>
      <div className="space-y-6">
        <section className="flex justify-between">
          <h1 className="text-3xl font-semibold text-primary">Posts</h1>
          {/* <div className="flex gap-8">
            <button className="btn-secondary flex items-center gap-2 px-4">
              <TableExportSvg className="h-6" />
              <span>Export</span>
            </button>
            <UserFormModal handleCreate={handleCreate} triggerClassName="btn-primary flex items-center gap-2 py-2 pl-4 pr-6">
              <AddSvg className="h-6" />
              <span>Add User</span>
            </UserFormModal>
          </div> */}
        </section>
        <PostTable />
      </div>
    </PageWrapper>
  );
}
