import * as Dialog from "@radix-ui/react-dialog";
import { XIcon as X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export const Sheet = Dialog.Root;
export const SheetTrigger = Dialog.Trigger;
export const SheetClose = Dialog.Close;
export const SheetTitle = Dialog.Title;
export const SheetDescription = Dialog.Description;

export function SheetContent({
  children,
  className,
  side = "right",
}: {
  children: React.ReactNode;
  className?: string;
  side?: "right" | "bottom";
}) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="sheet-overlay" />
      <Dialog.Content className={cn("sheet-content", `sheet-${side}`, className)}>
        {children}
        <Dialog.Close className="sheet-x" aria-label="Close">
          <X size={22} weight="bold" />
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
