import React, { ComponentProps } from "react";
import { tv, VariantProps } from "tailwind-variants";
import Typography from "../typography";

const cardFormEmptyData = tv({
  base: "flex gap-2 w-full py-8 border border-gray-300 rounded justify-center",
  variants: {
    variant: {
      basic:
        "hover:cursor-pointer hover:border-blue-950 hover:bg-blue-50 transition duration-300 ease-in-out",
      onlyInfo: "bg-gray-100 text-gray-500 p-4 rounded",
    },
  },
  defaultVariants: {
    variant: "basic",
  },
});

interface CardFormEmptyDataProps
  extends ComponentProps<"div">,
    VariantProps<typeof cardFormEmptyData> {
  icon?: React.ReactNode;
  description: string;
  isLoading?: boolean;
}

const CardFormEmptyData: React.FC<CardFormEmptyDataProps> = ({
  description,
  icon,
  variant,
  className,
  isLoading,
  ...props
}) => {
  return (
    <div className={cardFormEmptyData({ variant, className })} {...props}>
      {icon}
      <Typography variant="formLabel">{description}</Typography>
    </div>
  );
};

export default CardFormEmptyData;
