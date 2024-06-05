import * as ScrollAreaRadix from "@radix-ui/react-scroll-area";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function ScrollArea({ children, className }: Props) {
  const scrollbarClasses = "z-20 select-none touch-none";
  const thumbClasses = "bg-primary rounded-full hover:bg-primaryLight";

  return (
    <ScrollAreaRadix.Root className={`${className} overflow-hidden`}>
      <ScrollAreaRadix.Viewport className="h-full w-full">
        {children}
      </ScrollAreaRadix.Viewport>
      <ScrollAreaRadix.Scrollbar
        orientation="horizontal"
        className={`${scrollbarClasses} h-2.5`}
      >
        <ScrollAreaRadix.Thumb className={thumbClasses} />
      </ScrollAreaRadix.Scrollbar>
      <ScrollAreaRadix.Scrollbar
        orientation="vertical"
        className={`${scrollbarClasses} w-1.5`}
      >
        <ScrollAreaRadix.Thumb className={thumbClasses} />
      </ScrollAreaRadix.Scrollbar>
      <ScrollAreaRadix.Corner />
    </ScrollAreaRadix.Root>
  );
}
