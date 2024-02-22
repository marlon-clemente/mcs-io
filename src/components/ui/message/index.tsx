import { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const message = tv({
  base: "p-2.5 rounded text-[12px] flex items-center flex items-center justify-center font-medium",

  variants: {
    variant: {
      default: "border border-zinc-800 text-zinc-800",
      info: "border bg-blue-200 border-blue-800 text-blue-800",
      error: "border bg-red-200 border-red-800 text-red-800",
      warning: "border bg-yellow-200 border-yellow-800 text-yellow-800",
      success: "border bg-green-200 border-green-800 text-green-800",
    },
  },

  defaultVariants: {
    variant: "default",
  },
});

export interface ButtonProps
  extends ComponentProps<"div">,
    VariantProps<typeof message> {
  isLoadind?: boolean;
}

export const Message = ({ className, variant, ...props }: ButtonProps) => {
  return <div {...props} className={message({ variant, className })} />;
};
