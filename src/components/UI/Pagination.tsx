import ReactPaginate from "react-paginate";
import { ChevronLeftSvg, ChevronRightSvg } from "../../icons/AllSvgs";

interface Props {
  totalPageCount: number;
  pageChangeHandler: (selected: number) => void;
  currentPage: number;
}

export default function Pagination({
  totalPageCount,
  pageChangeHandler,
  currentPage = 1,
}: Props) {
  return (
    <ReactPaginate
      pageCount={totalPageCount}
      forcePage={currentPage - 1}
      onPageChange={({ selected }) => pageChangeHandler(selected + 1)}
      previousLabel={<ChevronLeftSvg className="h-6" />}
      nextLabel={<ChevronRightSvg className="h-6" />}
      containerClassName="flex gap-1 text-[15px] font-medium overflow-hidden"
      pageLinkClassName="rounded w-8 h-8 flex items-center justify-center hover:bg-primaryHover"
      activeLinkClassName="btn-primary hover:bg-primaryLight"
      breakLinkClassName="rounded w-8 h-8 flex justify-center hover:bg-primaryHover"
      nextLinkClassName="rounded w-8 h-8 flex items-center justify-center hover:bg-primaryHover"
      previousLinkClassName="rounded w-8 h-8 flex items-center justify-center hover:bg-primaryHover"
      disabledLinkClassName="pointer-events-none text-grayDisabled"
    />
  );
}
