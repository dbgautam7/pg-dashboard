import Select from "react-select";
import colors from "tailwindcss/colors";
import { ISelectOptions } from "../../types";

export interface SearchSelectProps {
  options?: ISelectOptions[];
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  changeHandler?: (option: ISelectOptions | null) => void;
  required?: boolean;
  name?: string;
  defaultValue?: ISelectOptions | null;
  className?: string;
  clearable?: boolean;
  setOpen?: (open: boolean) => void;
  type?: "field" | "select";
}

export default function SearchSelect({
  changeHandler,
  options,
  name,
  defaultValue,
  className = "",
  placeholder = "Select",
  disabled = false,
  loading = false,
  required = false,
  clearable = false,
  setOpen,
  type = "select",
}: SearchSelectProps) {
  return (
    <Select
      placeholder={placeholder}
      isDisabled={disabled}
      isLoading={loading}
      options={options}
      onChange={changeHandler}
      required={required}
      name={name}
      defaultValue={defaultValue}
      className={className}
      isClearable={clearable}
      onMenuOpen={() => setOpen && setOpen(true)}
      onMenuClose={() => setOpen && setOpen(false)}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          ":hover": {
            borderColor: state.isFocused
              ? "#00A674"
              : type === "select"
              ? colors.gray[800]
              : colors.gray[500],
            color: state.isFocused
              ? "#00A674"
              : type === "select"
              ? colors.gray[800]
              : colors.gray[500],
            cursor: "pointer",
          },
          borderColor: state.isFocused
            ? "#00A674"
            : type === "select"
            ? colors.gray[500]
            : colors.gray[300],
          color: state.isFocused
            ? "#00A674"
            : type === "select"
            ? colors.gray[500]
            : colors.gray[300],
          boxShadow: "none",
          height: type === "select" ? "40px" : "auto",
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: state.isFocused ? "#00A674" : "white",
          color: state.isFocused ? colors.gray[100] : colors.gray[800],
          cursor: "pointer",
        }),
        placeholder: (baseStyles) => ({
          ...baseStyles,
          color: colors.gray[500],
          fontStyle: type === "select" ? "normal" : "italic",
        }),
        indicatorSeparator: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: state.isFocused ? "#00A674" : colors.gray[300],
        }),
        clearIndicator: (baseStyles) => ({
          ...baseStyles,
          color: colors.gray[500],
          ":hover": {
            color: "#00A674",
          },
        }),
        dropdownIndicator: (baseStyles) => ({
          ...baseStyles,
          color: "inherit",
          ":hover": {
            color: "inherit",
          },
        }),
        menu: (baseStyles) => ({
          ...baseStyles,
          zIndex: 20,
        }),
        valueContainer: (baseStyles) => ({
          ...baseStyles,
          padding: "4px 10px",
        }),
      }}
    />
  );
}
