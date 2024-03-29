import * as Dialog from "@radix-ui/react-dialog";
import React, { RefAttributes } from "react";

type RootProps = Dialog.DialogProps &
  RefAttributes<HTMLDivElement> & {
    children: React.ReactNode;
  };

export const Root: React.FC<RootProps> = ({ children, ...props }) => {
  return (
    <Dialog.Root {...props}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>{children}</Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
