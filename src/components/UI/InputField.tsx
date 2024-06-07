import { FC, forwardRef } from "react";
import Select from "./Select";

interface Props {
  label?: string;
  name: string;
  placeholder?: string;
  type?: string;
  defaultValue?: string;
  disabled?: boolean;
  options?: string[] | null | undefined;
}
type refType = HTMLInputElement | null;
const InputField: FC<Props> = forwardRef<refType, Props>(
  function InputFiledComponent(
    {
      label,
      name,
      placeholder,
      type = "text",
      defaultValue = "",
      disabled,
      options,
      ...rest
    },
    ref
  ) {
    const inputClasses =
      "peer rounded border border-grayBorderDark py-2 px-3 text-[14.5px] placeholder:italic placeholder:text-grayText hover:border-grayText focus:border-primary focus:outline-none";
    return (
      <div className="flex flex-grow flex-col-reverse gap-2">
        {type === "textarea" ? (
          <textarea
            name={name}
            {...rest}
            id={name}
            className={`${inputClasses} min-h-[64px] flex-grow`}
            placeholder={placeholder}
            defaultValue={defaultValue}
            required
          />
        ) : type === "select" ? (
          <Select
            name={name}
            placeholder={placeholder}
            // options={options}
            triggerMinWidth={130}
            position="popper"
            triggerClassName="h-10 hover:border-grayText"
          />
        ) : (
          <input
            type={type}
            name={name}
            className={inputClasses}
            placeholder={placeholder}
            defaultValue={defaultValue}
            ref={ref}
            {...rest}
            disabled={disabled}
          />
        )}
        <label
          htmlFor={name}
          className="font-medium text-grayTextDark peer-hover:text-blackText peer-focus:text-primary"
        >
          {label}
        </label>
      </div>
    );
  }
);

export default InputField;
