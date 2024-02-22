import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface TableCellProps extends ComponentProps<"td"> {}

export function Cell(props: TableCellProps) {
  return <td {...props} className={twMerge("py-3 px-4", props.className)} />;
}
