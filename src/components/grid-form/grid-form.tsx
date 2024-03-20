import React from "react";
import Typography from "../ui/typography";

interface GridFormProps {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  hasDivider?: boolean;
}

const GridForm: React.FC<GridFormProps> = ({
  children,
  icon,
  subtitle,
  title,
  hasDivider,
}) => {
  return (
    <div className="w-full">
      {hasDivider && <hr className="border-t border-gray-200 my-4" />}
      <div className="w-full grid grid-cols-3 gap-4">
        <div className="flex flex-col col-span-1 gap-1">
          <div className="flex gap-2">
            {icon}

            <Typography variant="title">{title}</Typography>
          </div>
          {subtitle && (
            <Typography variant="description">{subtitle}</Typography>
          )}
        </div>
        <div className="flex flex-col col-span-2 gap-3">{children}</div>
      </div>
    </div>
  );
};

export default GridForm;
