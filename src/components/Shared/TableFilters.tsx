import { useEffect, useState } from "react";

import Select from "../UI/Select";
import { UndoSvg } from "../../icons/AllSvgs";
import { ISelectOptions } from "../../types";

interface Props {
  sortOptions: ISelectOptions[];
  disabled?: boolean;
  sortChangeHandler?: (value: string) => void;
  orderChangeHandler?: (value: string) => void;
  clearFilterHandler?: () => void;
  sort?: {
    by: string | number;
    order: string;
  };
}

export default function TableFilters({
  sortOptions,
  disabled = false,
  sortChangeHandler,
  orderChangeHandler,
  clearFilterHandler,
  sort,
}: Props) {
  const [sortBy, setSortBy] = useState(sort?.by);
  const [sortOrder, setSortOrder] = useState(sort?.order);
  const [key, setKey] = useState(0); // To force re-render

  useEffect(() => {
    if (!sortBy) setSortBy(sortOptions[0].value);
    if (!sortOrder) setSortOrder("ascending");
  }, [sortOptions]);

  return (
    <div className="flex flex-wrap gap-4">
      {(sort?.by !== sortBy || sortOrder !== sort?.order) && (
        <button
          onClick={() => {
            if (sort) {
              setSortBy(sort.by);
              setSortOrder(sort.order);
            } else {
              setSortBy(undefined);
              setSortOrder(undefined);
            }
            setKey((prev) => prev + 1);
            clearFilterHandler?.();
          }}
          className="h-full self-center rounded border border-primary p-0.5 text-primary shadow transition-colors duration-200 hover:bg-primary hover:text-whiteText"
        >
          <UndoSvg className="h-5" />
        </button>
      )}
      <Select
        placeholder="Sort By"
        options={sortOptions}
        triggerMinWidth={130}
        position="popper"
        value={sortBy}
        onValueChange={(value) => {
          sortChangeHandler?.(value);
          setSortBy(value);
        }}
        key={key}
        disabled={disabled}
      />
      <Select
        placeholder="Order By"
        options={[
          { value: "ascending", label: "Ascending" },
          { value: "descending", label: "Descending" },
        ]}
        triggerMinWidth={130}
        position="popper"
        value={sortOrder}
        onValueChange={(value) => {
          orderChangeHandler?.(value);
          setSortOrder(value);
        }}
        disabled={!sortBy}
        key={key + 10}
      />
    </div>
  );
}
