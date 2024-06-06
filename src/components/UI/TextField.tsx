import { FC, HTMLProps, forwardRef, useState } from "react";
import { EyeOpenSvg, EyeClosedSvg, LockSvg } from "../../icons/AllSvgs";

interface Props extends HTMLProps<HTMLInputElement> {
  Icon?: ({ className }: { className: string }) => JSX.Element;
  errorMessage?: string;
  placeholder: string;
}

const TextField: FC<Props> = forwardRef<HTMLInputElement, Props>(
  function TextFieldComponent(
    { placeholder, errorMessage, Icon = LockSvg, ...rest },
    ref
  ) {
    const [hidePassword, setHidePassword] = useState(true);

    const eyeClickHandler = () => {
      setHidePassword((prev) => !prev);
    };

    return (
      <div className="flex flex-col  relative">
        <div className="flex items-center">
          <input
            {...rest}
            ref={ref}
            className={`peer flex-grow rounded border border-grayText py-3 pl-14 pr-4 text-[15px] placeholder:text-grayText hover:border-blackText focus:border-primary focus:outline-none ${
              rest.name === "password" ? "pr-14" : ""
            }`}
            placeholder=""
            type={
              rest.type === "password" && !hidePassword ? "text" : rest.type
            }
          />
          {Icon && (
            <Icon className="absolute left-4 h-6 w-6 text-grayText peer-hover:text-blackText peer-focus:text-primary" />
          )}
          <label
            htmlFor={rest.name}
            className="pointer-events-none absolute left-12 origin-left -translate-y-6 scale-90 rounded-full bg-white px-2 text-grayText transition-transform duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-90 peer-focus:text-primary whitespace-nowrap"
          >
            {placeholder}
          </label>
          {rest.type === "password" ? (
            <div
              className="absolute right-4 h-7 w-7 cursor-pointer text-grayText peer-hover:text-blackText peer-focus:text-primary"
              onClick={eyeClickHandler}
              title={hidePassword ? "Hide Password" : "Show Password"}
            >
              {hidePassword ? <EyeClosedSvg /> : <EyeOpenSvg />}
            </div>
          ) : null}
        </div>
        {errorMessage && (
          <span className="text-red-500 text-sm mt-1">{errorMessage}</span>
        )}
      </div>
    );
  }
);

export default TextField;
