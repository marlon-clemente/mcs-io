export default Button;

import { LucideLoader2 } from "lucide-react";
import { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: "h-8 text-[14px] px-4 disabled:opacity-50 inline-flex items-center flex items-center justify-center font-medium hover:cursor-pointer",

  variants: {
    variant: {
      default:
        "py-1.5 px-2.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-zinc-700",
      primary: "py-1 px-2 rounded bg-[#6c88fc] text-white hover:bg-[#596cc5]",
    },
    size: {
      default: "",
      icon: "p-1.5",
    },
  },

  defaultVariants: {
    variant: "default",
  },
});

export interface ButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof button> {
  isLoadind?: boolean;
}

export function Button({
  className,
  variant,
  size,
  isLoadind,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={isLoadind}
      {...props}
      className={button({ variant, size, className })}
    >
      {isLoadind ? (
        <div className="animate-spin">
          <LucideLoader2 />
        </div>
      ) : (
        props.children
      )}
    </button>
  );
}
