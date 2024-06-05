import ReactPaginate from "react-paginate";
import { ChevronLeftSvg, ChevronRightSvg } from "../../icons/AllSvgs";

interface Props {
  totalPageCount: number;
  pageChangeHandler: (selected: number) => void;
}

export default function Pagination({
  totalPageCount,
  pageChangeHandler,
}: Props) {
  return (
    <ReactPaginate
      pageCount={totalPageCount}
      onPageChange={({ selected }) => pageChangeHandler(selected)}
      previousLabel={<ChevronLeftSvg className="h-6" />}
      nextLabel={<ChevronRightSvg className="h-6" />}
      containerClassName="flex gap-1 text-[15px] font-medium"
      pageLinkClassName="rounded w-8 h-8 flex items-center justify-center hover:bg-primaryHover"
      activeLinkClassName="btn-primary hover:bg-primaryLight"
      breakLinkClassName="rounded w-8 h-8 flex justify-center hover:bg-primaryHover"
      nextLinkClassName="rounded w-8 h-8 flex items-center justify-center hover:bg-primaryHover"
      previousLinkClassName="rounded w-8 h-8 flex items-center justify-center hover:bg-primaryHover"
      disabledLinkClassName="pointer-events-none text-grayDisabled"
    />
  );
}
