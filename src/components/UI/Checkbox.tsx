const Checkbox = ({
  label,
  value,
  id,
  handleChange,
  checked,
}: {
  label: string;
  value: string;
  id?: string | number;
  handleChange?: () => void;
  checked: boolean;
}) => {
  return (
    <div className="flex gap-2 items-center">
      <input
        onChange={handleChange}
        className="accent-primary h-4 w-4"
        type="checkbox"
        id={id?.toString()}
        value={value}
        checked={checked}
      />
      <label className="leading-none font-normal" htmlFor={id?.toString()}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
