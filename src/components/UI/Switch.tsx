import * as SwitchRadix from "@radix-ui/react-switch";
import { useState } from "react";

interface Props {
  active: boolean;
  changeHandler: (checked: boolean) => void;
  disabled?: boolean;
}

export default function Switch({
  active,
  changeHandler,
  disabled = false,
}: Props) {
  const [checked, setChecked] = useState(active);

  return (
    <SwitchRadix.Root
      className="h-6 w-12 rounded-full bg-gray-400 shadow hover:bg-gray-500 data-[state=checked]:bg-primary"
      onClick={(e) => e.stopPropagation()}
      checked={checked}
      onCheckedChange={(checked) => {
        setChecked(checked);
        changeHandler(checked);
      }}
      disabled={disabled}
    >
      <SwitchRadix.Thumb className="block h-5 w-5 translate-x-[2px] rounded-full bg-white shadow transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[26px]" />
    </SwitchRadix.Root>
  );
}
