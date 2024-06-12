import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import PageWrapper from "../../layouts/PageWrapper";
import { TableExportSvg } from "../../icons/AllSvgs";
import Table from "../../components/Shared/Table";

interface ReportTableType {
  id: string;
  category: string;
}

const dummyData: ReportTableType[] = [];
dummyData.push(
  ...[...Array(10)].map((_, i) => ({
    id: `${i + 1}`,
    category: `Category ${i + 1}`,
  }))
);

const columnHelper = createColumnHelper<ReportTableType>();

export default function ReportsPage() {
  const columns = useMemo(
    () => [
      columnHelper.accessor("category", {
        header: "Category",
      }),
    ],
    []
  );

  return (
    <PageWrapper>
      <div className="space-y-6">
        <section className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-primary">Reports</h1>
          <button className="btn-primary flex items-center gap-2 py-2 px-4">
            <TableExportSvg className="h-6" />
            <span>Export</span>
          </button>
        </section>
        <Table
          data={dummyData}
          columns={columns}
          isError={false}
          isLoading={false}
          totalEntries={dummyData.length}
          showFooter
          currentPage={0}
          pageChangeHandler={function (selected: number): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
    </PageWrapper>
  );
}
