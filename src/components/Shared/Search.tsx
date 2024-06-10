import { CrossSvg, SearchSvg } from "../../icons/AllSvgs";

interface Props {
  placeholder: string;
  searchValue?: string;
  className?: string;
  disabled?: boolean;
  searchHandler?: (value: string) => void;
}

export default function Search({
  placeholder,
  searchValue,
  searchHandler,
  className = "",
  disabled = false,
}: Props) {
  return (
    <form className={`relative flex items-center ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => searchHandler?.(e.target.value)}
        spellCheck="false"
        className="peer h-10 w-full rounded border border-grayText px-11 text-[15px] placeholder:text-grayText hover:border-blackText focus:border-primary focus:outline-none disabled:pointer-events-none disabled:select-none"
        name="search"
        disabled={disabled}
      />
      <SearchSvg className="absolute left-2.5 h-6 text-grayText peer-hover:text-blackText peer-focus:text-primary" />
      {searchValue ? (
        <button
          type="reset"
          className="absolute right-3 text-grayText peer-hover:text-blackText peer-focus:text-primary"
          onClick={() => searchHandler?.("")}
        >
          <CrossSvg className="h-6" />
        </button>
      ) : null}
    </form>
  );
}
