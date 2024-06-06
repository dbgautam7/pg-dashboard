import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";

import Table from "../Shared/Table";
import Tooltip from "../UI/Tooltip";
import { DeleteSvg, EditSvg, UserCircleSvg } from "../../icons/AllSvgs";
import AlertDialog from "../UI/AlertDialog";
import { deleteAlertDescription } from "../../utils/constants";
import Search from "../Shared/Search";
import TableFilters from "../Shared/TableFilters";

import {
  usePaymentInTransactionData,
  useUsersData,
} from "../../hooks/useQueryData";
import { IPayTransactionList } from "../../types";

const columnHelper = createColumnHelper<IPayTransactionList>();

export default function TransactionTable({ handleUpdate }: any) {
  const { data, isLoading, isError } = usePaymentInTransactionData();
  console.log(data, "Data");
  const columns = useMemo(
    () => [
      columnHelper.accessor("ct_merchant_id", {
        header: "CT Merchant Id",
      }),
      columnHelper.accessor("member_id", {
        header: "Member Id",
      }),
      columnHelper.accessor("username", {
        header: "Username",
      }),
      columnHelper.accessor("order_number", {
        header: "Order Number",
      }),
      columnHelper.accessor("amount", {
        header: "Amount",
      }),
      columnHelper.accessor("response", {
        header: "Comment",
      }),
      columnHelper.accessor("status", {
        header: "Status",
      }),
    ],
    []
  );

  return (
    <section>
      {(!isLoading || !isError) && (
        <div className="mb-4 flex justify-between">
          {/* <SearchSelect
            className="w-72 text-[15px] shadow"
            options={[
              { value: 1, label: 'All Users' },
              { value: 2, label: 'Active Users' },
              { value: 3, label: 'Inactive Users' },
              { value: 4, label: 'Free Signup (Never Subscribed)' },
            ]}
            defaultValue={{ value: 1, label: 'All Users' }}
          /> */}
          <div className="flex gap-4">
            {/* <TableFilters sortOptions={["Status", "Amount"]} /> */}
            <Search
              placeholder="Search Transactions"
              classname="shadow w-[316px]"
            />
          </div>
        </div>
      )}
      {data?.results && (
        <Table
          data={data.results}
          columns={[]}
          isError={isError}
          isLoading={isLoading}
          totalEntries={data.count}
          containsActions
          showFooter
        />
      )}
    </section>
  );
}
