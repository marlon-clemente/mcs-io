import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface TableBodyProps extends ComponentProps<"tbody"> {}

export function Body(props: TableBodyProps) {
  return (
    <tbody
      {...props}
      className={twMerge(
        "[&_tr:last-child]:border-0 [&_tr:hover]:bg-zinc-100/50",
        props.className
      )}
    />
  );
}
