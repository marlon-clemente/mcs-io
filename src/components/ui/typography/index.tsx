import { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const typography = tv({
  base: "leading-normal",

  variants: {
    variant: {
      description: "text-[15px] text-zinc-900",
      h1: "text-[18px] font-bold text-zinc-800",
      title: "text-[17px] font-medium text-zinc-900",
      formLabel: "font-semibold",
    },
    size: {
      default: "",
      icon: "p-1.5",
    },
  },

  defaultVariants: {
    variant: "description",
  },
});

export interface TypographyProps
  extends ComponentProps<"span">,
    VariantProps<typeof typography> {}

export default function Typography({
  className,
  variant,
  size,
  ...props
}: TypographyProps) {
  return (
    <span {...props} className={typography({ variant, size, className })} />
  );
}
