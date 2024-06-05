import { useState } from "react";
import SearchSelect, { type SearchSelectProps } from "./SearchSelect";

interface Props extends SearchSelectProps {
  label: string;
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export default function SearchSelectField({
  className,
  label,
  orientation = "vertical",
  ...rest
}: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      className={`flex ${className} ${
        orientation === "horizontal"
          ? "flex-row-reverse items-center justify-end gap-4"
          : "flex-col-reverse gap-2"
      }`}
    >
      <SearchSelect
        className="peer w-full text-[14.5px]"
        setOpen={setIsMenuOpen}
        type="field"
        {...rest}
      />
      <label
        className={`font-medium ${
          isMenuOpen
            ? "text-primary"
            : "text-grayTextDark peer-hover:text-blackText"
        }`}
      >
        {label}
      </label>
    </div>
  );
}
