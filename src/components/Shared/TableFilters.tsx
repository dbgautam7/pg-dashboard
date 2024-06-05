import { useState } from "react";

import Select from "../UI/Select";
import { CrossSvg } from "../../icons/AllSvgs";

interface Props {
  sortOptions: string[];
  disabled?: boolean;
}

export default function TableFilters({ sortOptions, disabled = false }: Props) {
  const [sortBy, setSortBy] = useState<string>();
  const [sortOrder, setSortOrder] = useState<string>();

  const [key, setKey] = useState(0); // To force re-render

  return (
    <div className="flex gap-4">
      {sortBy && (
        <button
          onClick={() => {
            setSortBy(undefined);
            setSortOrder(undefined);
            setKey((prev) => prev + 1);
          }}
          className="self-center rounded border border-primary p-0.5 text-primary shadow transition-colors duration-200 hover:bg-primary hover:text-whiteText"
        >
          <CrossSvg className="h-5" />
        </button>
      )}
      <Select
        placeholder="Sort By"
        options={sortOptions}
        triggerMinWidth={130}
        position="popper"
        value={sortBy}
        onValueChange={setSortBy}
        key={key}
        disabled={disabled}
      />
      <Select
        placeholder="Order By"
        options={["Ascending", "Descending"]}
        triggerMinWidth={130}
        position="popper"
        value={sortOrder}
        onValueChange={setSortOrder}
        disabled={!sortBy}
        key={key + 10}
      />
    </div>
  );
}
