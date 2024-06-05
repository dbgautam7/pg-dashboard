import type { Table } from "@tanstack/react-table";

import Select from "../UI/Select";
import Pagination from "../UI/Pagination";

interface Props<T extends object> {
  table: Table<T>;
  totalEntries: number;
}

export default function TableFooter<T extends object>({
  table,
  totalEntries,
}: Props<T>) {
  const pageSize = table.getState().pagination.pageSize;
  const currentPage = table.getState().pagination.pageIndex; // 0 based

  const totalPageCount = Math.ceil(totalEntries / pageSize);

  return (
    <div className="flex items-center justify-between pt-4 text-[15px] font-medium">
      <span className="text-grayText">
        Showing {currentPage * pageSize + 1} to{" "}
        {Math.min(pageSize * (currentPage + 1), totalEntries)} of {totalEntries}{" "}
        Entries
      </span>
      <Pagination
        totalPageCount={totalPageCount}
        pageChangeHandler={(selected) => table.setPageIndex(selected)}
      />
      <div className="flex items-center gap-4">
        <span className="text-grayText">Items per page</span>
        <Select
          options={["7", "10", "20", "30", "40", "50"]}
          value={table.getState().pagination.pageSize.toString()}
          onValueChange={(value) => table.setPageSize(Number(value))}
          triggerClassName="py-0.5"
        />
      </div>
    </div>
  );
}
