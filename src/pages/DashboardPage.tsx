import PageWrapper from "../layouts/PageWrapper";
import { useSystemConfigList } from "../hooks/useQueryData";
import LoadingSvg from "../assets/loading.svg";
import Error from "../components/Shared/Error";
import { ISystemConfigList } from "../types";
import { useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "../components/Shared/Table";

export default function DashboardPage() {
  const { data, isLoading, isError } = useSystemConfigList();
  const columnHelper = createColumnHelper<ISystemConfigList>();
  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "Id",
      }),

      columnHelper.accessor("name", {
        header: "Name",
      }),
      columnHelper.accessor("parameter", {
        header: "Parameter",
      }),
      columnHelper.accessor("value", {
        header: "Value",
      }),
      columnHelper.accessor("comment", {
        header: "Comment",
      }),
    ],
    []
  );

  return (
    <PageWrapper>
      <h1 className="mb-8 text-3xl font-semibold text-primary">Dashboard</h1>
      <section className="border w-full rounded overflow-y-auto">
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
            data={data}
            columns={columns || []}
            isError={isError}
            isLoading={isLoading}
            totalEntries={data?.totalPages || 0}
            showFooter
            currentPage={data?.currentPage || 1}
            pageChangeHandler={() => {
              //
            }}
          />
        )}
      </section>
    </PageWrapper>
  );
}
