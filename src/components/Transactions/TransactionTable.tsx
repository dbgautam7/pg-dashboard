import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import Table from "../Shared/Table";
import Search from "../Shared/Search";
import LoadingSvg from "../../assets/loading.svg";

import { IPayTransactionList, ISelectOptions } from "../../types";
import SearchSelect from "../UI/SearchSelect";
import Error from "../Shared/Error";
import { dateRangeFilterOptions, statusFilterOptions } from "../../constants";
import debounce from "../../utils/debounce";
import { getDateRange } from "../../utils/getDateRange";
import { useTransactionData } from "../../hooks/useQueryData";
import { CrossCircleSvg, CrossTickSvg } from "../../icons/AllSvgs";
import TransactionAcceptRejectModal from "./AcceptRejectModal";
import { useAcceptRejectTransactionMutation } from "../../hooks/useMutateData";
import { SubmitHandler } from "react-hook-form";
import { useToast } from "../../contexts/ToastContext";

interface IDateRange {
  startDate: Date;
  endDate: Date;
}

interface IFormData {
  remarks: string;
  status?: string;
}

const columnHelper = createColumnHelper<IPayTransactionList>();

export default function TransactionTable({ queryKey }: { queryKey?: string }) {
  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [actionType, setActionType] = useState<string>("");
  const [selectedId, setSelectedId] = useState<number>();

  const [selectedStatus, setSelectedStatus] = useState<ISelectOptions>(
    statusFilterOptions?.[0]
  );
  const [selectedDuration, setSelectedDuration] = useState<ISelectOptions>(
    dateRangeFilterOptions?.[0]
  );

  const [selectedDateRange, setSelectedDateRange] = useState<IDateRange>(
    getDateRange(selectedDuration?.value)
  );

  useMemo(() => {
    setSelectedDateRange(getDateRange(selectedDuration?.value));
  }, [selectedDuration]);

  const params = useMemo(
    () => ({
      username: searchValue,
      status: selectedStatus.value,
      page: page,
      startDate: selectedDateRange.startDate,
      endDate: selectedDateRange.endDate,
    }),
    [searchValue, selectedStatus, page, selectedDateRange]
  );
  const acceptRejectTransactionMutatin = useAcceptRejectTransactionMutation();

  const { data, isLoading, isError, refetch } = useTransactionData(
    queryKey,
    params
  );

  const { updateToast } = useToast();

  const debouncedSearch = useMemo(
    () => debounce((value) => setSearchValue(value), 100, true),
    []
  );

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
        id: "status",
        cell: ({ row }) => {
          let style: string;
          const originalData: string = row.original.status;
          if (originalData === "initiate") {
            style = "bg-gray-400";
          } else if (originalData === "success") {
            style = "bg-green-400";
          } else if (originalData === "pending") {
            style = "bg-yellow-400";
          } else {
            style = "bg-red-400";
          }
          return (
            <section className="flex items-center gap-1">
              <p className={`capitalize px-2 ${style}`}>
                {row.original.status}
              </p>
              {originalData === "initiate" && queryKey === "withdraw" && (
                <div className="flex gap-1">
                  <button
                    onClick={() => {
                      setIsModalOpen(true);
                      setActionType("reject");
                      setSelectedId(row.original.id);
                    }}
                  >
                    <CrossCircleSvg className="h-5 w-5 text-red-400" />
                  </button>
                  <button
                    onClick={() => {
                      setIsModalOpen(true);
                      setActionType("success");
                      setSelectedId(row.original.id);
                    }}
                  >
                    <CrossTickSvg className="h-5 w-5 text-green-400" />
                  </button>
                </div>
              )}
            </section>
          );
        },
      }),
    ],
    []
  );

  const handleAcceptRejectTransaction: SubmitHandler<IFormData> = (data) => {
    data.status = actionType;
    acceptRejectTransactionMutatin.mutateAsync(["post", selectedId, data], {
      onSuccess: () => {
        updateToast("Transaction Accepted Successfully", "success");
        setIsModalOpen(false);
        refetch();
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
    <section className="space-y-6">
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
          containsActions={queryKey === "withdraw" ? true : false}
          showFooter
          pageChangeHandler={(page) => setPage(page)}
        />
      )}
      <TransactionAcceptRejectModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        action={actionType}
        handleAcceptOrReject={handleAcceptRejectTransaction}
      />
    </section>
  );
}
