import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import Table from "../Shared/Table";
import Search from "../Shared/Search";
import LoadingSvg from "../../assets/loading.svg";

import { usePaymentInTransactionData } from "../../hooks/useQueryData";
import { IPayTransactionList, ISelectOptions } from "../../types";
import SearchSelect from "../UI/SearchSelect";
import Error from "../Shared/Error";

const columnHelper = createColumnHelper<IPayTransactionList>();

export default function TransactionTable() {
  const [selectedFilter, setSelectedFilter] = useState<ISelectOptions | null>({
    value: "in",
    label: "Payment In Transaction",
  });
  const { data, isLoading, isError, refetch } = usePaymentInTransactionData(
    selectedFilter?.value
  );

  const filterOptions: ISelectOptions[] = [
    { value: "in", label: "Payment In Transaction" },
    { value: "out", label: "Payment Out Transaction" },
  ];

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "Id",
      }),
      columnHelper.accessor("order_number", {
        header: "Order No.",
      }),
      columnHelper.accessor("username", {
        header: "Username",
      }),
      columnHelper.accessor("gateway", {
        header: "Gateway",
      }),
      columnHelper.accessor("amount", {
        header: "Amount",
      }),

      columnHelper.accessor("member_id", {
        header: "Member Id",
      }),

      columnHelper.accessor("status", {
        header: "Status",
      }),
    ],
    []
  );

  useEffect(() => {
    refetch();
  }, [selectedFilter?.value]);

  return (
    <section>
      <div className="mb-4 flex justify-between">
        <SearchSelect
          className="w-72 text-[15px] shadow"
          options={filterOptions}
          defaultValue={selectedFilter}
          changeHandler={(option) => {
            setSelectedFilter(option);
          }}
        />
        <div className="flex gap-4">
          <Search
            placeholder="Search Transactions"
            classname="shadow w-[316px]"
          />
        </div>
      </div>

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
          columns={columns}
          isError={isError}
          isLoading={isLoading}
          totalEntries={data?.length}
          containsActions
          showFooter
        />
      )}
    </section>
  );
}
