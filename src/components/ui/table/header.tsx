import { ComponentProps } from "react";

interface TableHeaderProps extends ComponentProps<"thead"> {}

export function Header(props: TableHeaderProps) {
  return <thead {...props} />;
}
