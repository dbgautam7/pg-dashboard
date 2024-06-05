import React, { ChangeEventHandler, useState } from "react";
import styles from "./InputField.module.scss";
import { LockSvg } from "../../icons/AllSvgs";

type PropsType = {
  label?: string;
  name?: string;
  type: string;
  required?: boolean;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  validateInput?: Function;
  placeholder: string;
  value?: string;
  disabled?: boolean;
  max?: string | number;
  min?: string | number;
  registerName?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  rest?: any;
};
type RefType = HTMLInputElement | null;
const InputField = React.forwardRef<RefType, PropsType>(
  (
    {
      label,
      name,
      type,
      required = false,
      setValue,
      validateInput,
      placeholder,
      value,
      disabled = false,
      max,
      min,
      registerName,
      onChange,
      ...rest
    },
    ref
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
      <div className={styles.main}>
        <div className={styles.labelCon}>
          {label && <label htmlFor={name}>{label}</label>}
          {required && <span>*</span>}
        </div>

        <input
          type={
            type === "password" ? (!showPassword ? "password" : "text") : type
          }
          autoComplete={type === "password" ? "off" : "on"}
          className={styles.input}
          name={name}
          disabled={disabled}
          id={name}
          max={max}
          min={min}
          value={value && value}
          placeholder={placeholder}
          onChange={onChange}
          ref={ref}
          {...rest}
        />
        {
          <>
            {type === "password" ? (
              !showPassword ? (
                <div className={styles.iconWrapper}>
                  <LockSvg
                    className={`fas fa-eye-slash `}
                    // onClick={handleShowPassword}
                  />
                </div>
              ) : (
                <div className={styles.iconWrapper}>
                  <LockSvg
                    className={`fas fa-eye `}
                    // onClick={handleShowPassword}
                  />
                </div>
              )
            ) : null}
          </>
        }
      </div>
    );
  }
);

export default InputField;
