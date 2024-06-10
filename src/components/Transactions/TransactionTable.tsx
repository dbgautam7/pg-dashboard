import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import Table from "../Shared/Table";
import Search from "../Shared/Search";
import LoadingSvg from "../../assets/loading.svg";

import { usePaymentInTransactionData } from "../../hooks/useQueryData";
import { IPayTransactionList, ISelectOptions } from "../../types";
import SearchSelect from "../UI/SearchSelect";
import Error from "../Shared/Error";
import RadioButton from "../UI/RadioButton";
import {
  dateRangeFilterOptions,
  statusFilterOptions,
  transactionFilterOptions,
} from "../../constants";
import debounce from "../../utils/debounce";
import { getDateRange } from "../../utils/getDateRange";

const columnHelper = createColumnHelper<IPayTransactionList>();

export default function TransactionTable() {
  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<ISelectOptions>(
    transactionFilterOptions?.[0]
  );
  const [selectedStatus, setSelectedStatus] = useState<ISelectOptions>(
    statusFilterOptions?.[0]
  );
  const [selectedDuration, setSelectedDuration] = useState<ISelectOptions>(
    dateRangeFilterOptions?.[2]
  );

  const [selectedDateRange, setSelectedDateRange] = useState<any>({});

  const { data, isLoading, isError } = usePaymentInTransactionData(
    selectedFilter && selectedFilter?.value.toString(),
    {
      username: searchValue,
      status: selectedStatus.value,
      page: page,
      startDate: selectedDateRange.startDate,
      endDate: selectedDateRange.endDate,
    }
  );

  const debouncedSearch = useMemo(
    () => debounce((value) => setSearchValue(value), 100, true),
    []
  );

  useMemo(() => {
    setSelectedDateRange(getDateRange(selectedDuration?.value));
  }, [selectedDuration]);

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

  return (
    <section className="space-y-6">
      <RadioButton
        filterOptions={transactionFilterOptions}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      <div className="mb-4 flex justify-between">
        <section className="flex gap-4">
          <SearchSelect
            className="w-48 text-[15px] shadow"
            options={statusFilterOptions}
            defaultValue={selectedStatus}
            changeHandler={(option: any) => {
              setSelectedStatus(option);
            }}
          />
          <SearchSelect
            className="w-48 text-[15px] shadow"
            options={dateRangeFilterOptions}
            defaultValue={selectedDuration}
            changeHandler={(option: any) => {
              setSelectedDuration(option);
            }}
          />
        </section>
        <div className="flex gap-4">
          <Search
            placeholder="Search Transactions"
            className="shadow w-[316px]"
            searchValue={searchValue}
            searchHandler={(value) => debouncedSearch(value)}
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
          currentPage={data.currentPage}
          data={data?.data}
          columns={columns}
          isError={isError}
          isLoading={isLoading}
          totalEntries={data?.totalPages}
          containsActions
          showFooter
          pageChangeHandler={(page) => setPage(page)}
        />
      )}
    </section>
  );
}
