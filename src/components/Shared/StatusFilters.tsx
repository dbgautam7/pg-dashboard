import { useState } from "react";

import {
  CrossCircleSvg,
  PendingSvg,
  CheckCircleSvg,
} from "../../icons/AllSvgs";

const buttons = [
  {
    label: "Approved",
    Icon: CheckCircleSvg,
    bgColor: "bg-green-200",
    disabledColor: "disabled:bg-green-100",
    underlineColor: "bg-green-800",
    textColor: "text-green-800",
  },
  {
    label: "Pending",
    Icon: PendingSvg,
    bgColor: "bg-amber-200",
    disabledColor: "disabled:bg-amber-100",
    underlineColor: "bg-amber-800",
    textColor: "text-amber-800",
  },
  {
    label: "Rejected",
    Icon: CrossCircleSvg,
    bgColor: "bg-rose-200",
    disabledColor: "disabled:bg-rose-100",
    underlineColor: "bg-rose-800",
    textColor: "text-rose-800",
  },
];

interface Props {
  disabled?: boolean;
}

export default function StatusFilters({ disabled = false }: Props) {
  const [activeBtn, setActiveBtn] = useState(0);

  return (
    <div className="flex flex-grow gap-6 text-[17px] font-medium text-grayText">
      {buttons.map(({ label, Icon, bgColor, disabledColor, textColor }, i) => (
        <button
          key={i}
          className={`${
            activeBtn === i
              ? `${textColor} ${bgColor} ${disabledColor}`
              : "hover:text-blackText"
          } relative flex select-none items-center gap-3 rounded-t px-4 disabled:text-grayText`}
          onClick={() => setActiveBtn(i)}
          disabled={disabled}
        >
          <Icon className="h-6" />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
