import * as TooltipRadix from "@radix-ui/react-tooltip";

interface Props {
  children: React.ReactNode;
  content: string;
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  delayDuration?: number;
  asChild?: boolean;
  triggerClassName?: string;
}

const Tooltip = ({
  children,
  content,
  side = "top",
  sideOffset = 4,
  delayDuration = 500,
  asChild = false,
  triggerClassName = "",
}: Props) => (
  <TooltipRadix.Provider delayDuration={delayDuration}>
    <TooltipRadix.Root>
      <TooltipRadix.Trigger asChild={asChild} className={triggerClassName}>
        {children}
      </TooltipRadix.Trigger>
      <TooltipRadix.Portal>
        <TooltipRadix.Content
          className="z-[100] select-none rounded bg-primaryLight px-3 py-1 text-sm text-whiteText shadow"
          sideOffset={sideOffset}
          side={side}
        >
          {content}
          <TooltipRadix.Arrow className="fill-primaryLight" />
        </TooltipRadix.Content>
      </TooltipRadix.Portal>
    </TooltipRadix.Root>
  </TooltipRadix.Provider>
);

export default Tooltip;
