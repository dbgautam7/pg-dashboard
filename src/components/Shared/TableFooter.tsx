import type { Table } from "@tanstack/react-table";

import Pagination from "../UI/Pagination";

interface Props<T extends object> {
  table: Table<T | any>;
  totalEntries: number;
  pageChangeHandler: (selected: number) => void;
  currentPage: number;
}

export default function TableFooter<T extends object>({
  table,
  totalEntries,
  pageChangeHandler,
  currentPage,
}: Props<T>) {
  const pageSize = table.getState().pagination.pageSize;

  return (
    <div className="flex flex-wrap items-center justify-between pt-4 text-[15px] font-medium">
      <span className="text-grayText">
        Showing {(currentPage - 1) * pageSize + 1} to{" "}
        {Math.min(pageSize * (currentPage - 1 + 1), totalEntries)} of{" "}
        {totalEntries} Entries
      </span>
      <Pagination
        totalPageCount={totalEntries}
        pageChangeHandler={pageChangeHandler}
        currentPage={currentPage}
      />
    </div>
  );
}
