import { useState } from "react";
import { CrossSvg, SearchSvg } from "../../icons/AllSvgs";

interface Props {
  placeholder: string;
  classname?: string;
  disabled?: boolean;
}

export default function Search({
  placeholder,
  classname = "",
  disabled = false,
}: Props) {
  const [search, setSearch] = useState("");

  return (
    <form className={`relative flex items-center ${classname}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        spellCheck="false"
        className="peer h-10 w-full rounded border border-grayText px-11 text-[15px] placeholder:text-grayText hover:border-blackText focus:border-primary focus:outline-none disabled:pointer-events-none disabled:select-none"
        name="search"
        disabled={disabled}
      />
      <SearchSvg className="absolute left-2.5 h-6 text-grayText peer-hover:text-blackText peer-focus:text-primary" />
      {search ? (
        <button
          type="reset"
          className="absolute right-3 text-grayText peer-hover:text-blackText peer-focus:text-primary"
          onClick={() => setSearch("")}
        >
          <CrossSvg className="h-6" />
        </button>
      ) : null}
    </form>
  );
}
