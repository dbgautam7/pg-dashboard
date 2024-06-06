import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useReactTable,
  flexRender,
  SortingState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
} from "@tanstack/react-table";

import Error from "../Shared/Error";
import ScrollArea from "../UI/ScrollArea";
import TableFooter from "./TableFooter";
import EmptySvg from "../../assets/empty.svg";
import LoadingSvg from "../../assets/loading.svg";
import { SortSvg, ChevronDownSvg, ChevronUpSvg } from "../../icons/AllSvgs";

interface Props<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
  isLoading: boolean;
  isError: boolean;
  className?: string;
  totalEntries: number | undefined;
  allowHover?: boolean;
  showFooter?: boolean;
  containsCheckbox?: boolean;
  containsActions?: boolean;
  pageSize?: number;
}

export default function Table<T>({
  data,
  columns,
  isLoading,
  isError,
  totalEntries,
  className = "",
  allowHover = false,
  showFooter = false,
  containsCheckbox = false,
  containsActions = false,
  pageSize = 7,
}: Props<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  // const navigate = useNavigate();

  const table = useReactTable({
    data,
    columns,
    initialState: { pagination: { pageSize } },
    enableSorting: !isLoading && !isError,
    state: { sorting, rowSelection },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <ScrollArea
        className={`border-primarySelect rounded border ${className}`}
      >
        <table className="w-full">
          <thead className="bg-primarySelect sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`group whitespace-nowrap py-4 text-start font-semibold first:pl-4 last:pr-4 ${
                      header.column.getCanSort()
                        ? "cursor-pointer select-none"
                        : ""
                    } ${containsCheckbox ? "first:w-1" : ""} ${
                      containsActions ? "last:w-1" : ""
                    }`}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center justify-between">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                      {{
                        asc: <ChevronUpSvg className="h-6 pr-8 text-primary" />,
                        desc: (
                          <ChevronDownSvg className="h-6 pr-8 text-primary" />
                        ),
                      }[header.column.getIsSorted() as string] ??
                        (header.column.getCanSort() ? (
                          <SortSvg className="invisible h-5 pr-8 group-hover:visible" />
                        ) : null)}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="text-[15px]">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={`border-y border-primaryHover ${
                  row.getIsSelected()
                    ? "bg-primarySelect"
                    : allowHover
                    ? "hover:bg-primaryHover"
                    : ""
                } ${allowHover ? "cursor-pointer" : "cursor-default"}`}
                // onClick={() => allowHover && navigate(row.original.id)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-4 first:pl-4">
                    <span className="flex items-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {isLoading ? (
          <img
            src={LoadingSvg}
            className="mx-auto mt-4 h-28"
            alt="Loading Spinner"
          />
        ) : isError ? (
          <Error />
        ) : totalEntries === 0 ? (
          <div className="mt-12 flex flex-col items-center gap-4">
            <img src={EmptySvg} alt="Empty" className="h-80" />
            <span className="font-medium">
              Start by adding some data to the table.
            </span>
          </div>
        ) : null}
      </ScrollArea>

      {!isLoading && !isError && totalEntries && showFooter ? (
        <TableFooter table={table} totalEntries={totalEntries} />
      ) : null}
    </>
  );
}
