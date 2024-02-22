import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface TableHeadProps extends ComponentProps<"th"> {}

export function Head(props: TableHeadProps) {
  return (
    <th
      {...props}
      className={twMerge(
        "text-left py-3 px-4 font-medium text-zinc-900",
        props.className
      )}
    />
  );
}
