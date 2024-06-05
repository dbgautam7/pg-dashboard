interface Props {
  className?: string;
}

export default function DatePicker({ className }: Props) {
  return (
    <input
      type="date"
      className={`h-full rounded border border-grayText px-2 text-[15px] ${className}`}
    />
  );
}
