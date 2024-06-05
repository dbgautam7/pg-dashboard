import * as SelectRadix from "@radix-ui/react-select";
import {
  CheckCircleSvg,
  ChevronDownSvg,
  ChevronUpSvg,
} from "../../icons/AllSvgs";

interface Props {
  options: string[] | null | undefined;
  triggerClassName?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  placeholder?: string;
  position?: "item-aligned" | "popper";
  triggerMinWidth?: number;
  disabled?: boolean;
}

const Select = ({
  placeholder,
  options,
  position = "item-aligned",
  triggerMinWidth = 0,
  value,
  onValueChange,
  name,
  triggerClassName = "",
  disabled = false,
}: Props) => (
  <SelectRadix.Root
    value={value}
    onValueChange={onValueChange}
    name={name}
    disabled={disabled}
  >
    <SelectRadix.Trigger
      className={`min-w-[${triggerMinWidth}px] flex select-none items-center justify-between gap-2 rounded border bg-white pl-4 pr-2 text-[15px] font-medium shadow transition-colors duration-200 hover:!border-primary hover:bg-primary hover:!text-whiteText data-[disabled]:pointer-events-none data-[state=open]:border-primary data-[disabled]:border-grayText data-[state=open]:text-primary data-[disabled]:text-grayText ${triggerClassName} ${
        value && placeholder ? "border-primary text-primary" : "border-grayText"
      }`}
    >
      <SelectRadix.Value placeholder={placeholder} />
      <SelectRadix.Icon>
        <ChevronDownSvg className="h-6" />
      </SelectRadix.Icon>
    </SelectRadix.Trigger>

    <SelectRadix.Portal>
      <SelectRadix.Content
        className="z-[60] overflow-hidden rounded border border-primary bg-white shadow"
        position={position}
        sideOffset={5}
        align="center"
      >
        <SelectRadix.ScrollUpButton className="flex h-6 cursor-default items-center justify-center bg-white text-primary">
          <ChevronUpSvg className="h-6" />
        </SelectRadix.ScrollUpButton>

        <SelectRadix.Viewport className="py-1">
          {options?.map((option) => (
            <SelectRadix.Item
              key={option}
              value={option.toLowerCase()}
              className="relative flex cursor-pointer select-none items-center gap-2 py-2 pl-8 pr-9 text-sm data-[highlighted]:bg-primary data-[highlighted]:text-whiteText data-[highlighted]:outline-none"
            >
              <SelectRadix.ItemIndicator className="absolute left-2 flex items-center justify-center">
                <CheckCircleSvg className="h-4" />
              </SelectRadix.ItemIndicator>
              <SelectRadix.ItemText>{option}</SelectRadix.ItemText>
            </SelectRadix.Item>
          ))}
        </SelectRadix.Viewport>

        <SelectRadix.ScrollDownButton className="flex h-6 cursor-default items-center justify-center bg-white text-primary">
          <ChevronDownSvg className="h-5" />
        </SelectRadix.ScrollDownButton>
      </SelectRadix.Content>
    </SelectRadix.Portal>
  </SelectRadix.Root>
);

export default Select;
