import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface TableProps extends ComponentProps<"table"> {}

export function Root(props: TableProps) {
  return (
    <table
      {...props}
      className={twMerge(
        "w-full text-sm border-t border-b border-zinc-700",
        props.className
      )}
    />
  );
}
