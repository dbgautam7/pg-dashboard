import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { useState } from "react";

import { DeleteSvg, EditSvg } from "../../icons/AllSvgs";
import AlertDialog from "../UI/AlertDialog";
import { deleteAlertDescription } from "../../utils/constants";

interface Props {
  children: React.ReactNode;
  editHandler: () => void;
  deleteHandler: () => void;
  closeHandler?: () => void;
  className?: string;
  color?: "primary" | "secondary";
  label?: string;
}

export default function DropdownMenu({
  children,
  editHandler,
  deleteHandler,
  className,
  closeHandler = () => {},
  color = "primary",
  label = "Item Actions",
}: Props) {
  const [open, setOpen] = useState(false);

  const options = [
    {
      label: "Edit",
      Icon: EditSvg,
      clickHandler: editHandler,
    },
    {
      label: "Delete",
      Icon: DeleteSvg,
      clickHandler: deleteHandler,
    },
  ];

  const DropdownMenuItem = ({ item }: { item: (typeof options)[0] }) => (
    <Dropdown.Item
      onClick={item.label === "Delete" ? () => {} : item.clickHandler}
      onSelect={item.label === "Delete" ? (e) => e.preventDefault() : () => {}}
      className={`flex cursor-pointer items-center gap-2 rounded py-1.5 px-3 text-sm outline-none ${
        item.label === "Delete" ? "hover:bg-rose-300" : "hover:bg-primarySelect"
      }`}
    >
      <item.Icon className="h-5" />
      <span>{item.label}</span>
    </Dropdown.Item>
  );

  return (
    <Dropdown.Root
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        if (!open) closeHandler();
      }}
    >
      <Dropdown.Trigger
        className={`${className} ${
          color === "primary"
            ? "data-[state=open]:text-primary"
            : "data-[state=open]:bg-secondary data-[state=open]:text-whiteText"
        }`}
      >
        {children}
      </Dropdown.Trigger>

      <Dropdown.Portal>
        <Dropdown.Content
          className={`z-20 rounded border bg-white p-1.5 shadow ${
            color === "primary" ? "border-primary" : "border-secondary"
          }`}
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <Dropdown.Label className="cursor-default px-3 text-sm font-medium">
            {label}
          </Dropdown.Label>
          <Dropdown.Separator
            className={`m-2 h-px ${
              color === "primary" ? "bg-primary" : "bg-secondary"
            }`}
          />
          {options.map((option, i) =>
            option.label === "Delete" ? (
              <AlertDialog
                clickHandler={option.clickHandler}
                key={i}
                description={deleteAlertDescription}
                btnText="Yes, delete data"
                closeHandler={() => {
                  setOpen(false);
                  closeHandler();
                }}
              >
                <DropdownMenuItem item={option} />
              </AlertDialog>
            ) : (
              <DropdownMenuItem item={option} key={i} />
            )
          )}
          <Dropdown.Arrow
            className={color === "primary" ? "fill-primary" : "fill-secondary"}
          />
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  );
}
