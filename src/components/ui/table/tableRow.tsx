import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface TableRowProps extends ComponentProps<"tr"> {}

export function Row(props: TableRowProps) {
  return (
    <tr
      {...props}
      className={twMerge("border-b border-zinc-800", props.className)}
    />
  );
}
