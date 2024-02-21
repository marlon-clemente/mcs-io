import * as Dialog from "@radix-ui/react-alert-dialog";
import React, { ForwardRefExoticComponent, RefAttributes } from "react";

type ContentProps = Dialog.DialogPortalProps &
  RefAttributes<HTMLDivElement> & {
    children: React.ReactNode;
  };

export const Content: ForwardRefExoticComponent<ContentProps> =
  React.forwardRef((props, ref) => {
    return (
      <Dialog.Content ref={ref} {...props}>
        {props.children}
      </Dialog.Content>
    );
  });

Content.displayName = "DialogContent";
