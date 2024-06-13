import type { Table } from "@tanstack/react-table";

import Pagination from "../UI/Pagination";

interface Props<T extends object> {
  table: Table<T | any>;
  totalEntries: number;
  pageChangeHandler: (selected: number) => void;
  currentPage: number;
}

export default function TableFooter<T extends object>({
  totalEntries,
  pageChangeHandler,
  currentPage,
}: Props<T>) {
  return (
    <div className="flex flex-wrap items-center justify-center pt-4 text-[15px] font-medium">
      <Pagination
        totalPageCount={totalEntries}
        pageChangeHandler={pageChangeHandler}
        currentPage={currentPage}
      />
    </div>
  );
}
