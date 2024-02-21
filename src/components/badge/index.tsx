import { ComponentProps } from "react";
import { tv, VariantProps } from "tailwind-variants";

const badge = tv({
  base: "inline-block py-1 px-2 rounded font-semibold text-[0.625rem]",

  variants: {
    variant: {
      orange: "bg-orange-400 text-orange-900",
      ghost: "bg-zinc-800 text-zinc-500",
      primary: "bg-teal-950 text-teal-300",
    },
  },

  defaultVariants: {
    variant: "ghost",
  },
});

interface BadgeProps
  extends ComponentProps<"span">,
    VariantProps<typeof badge> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={badge({ variant, className })} {...props} />;
}
