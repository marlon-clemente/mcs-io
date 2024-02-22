import { LucideXCircle } from "lucide-react";
import Typography from "../typography";

type HeaderProps = {
  title: string;
  icon?: React.ReactNode;
  onClose: () => void;
};

export const Header = ({ title, icon, onClose }: HeaderProps) => {
  return (
    <div className="w-full flex justify-between items-center border-b pb-2">
      <Typography variant="title" className="flex justify-center">
        {icon && <span className="mr-2">{icon}</span>}
        {title}
      </Typography>
      <button
        onClick={onClose}
        className="rounded-full focus:shadow-[0_0_0_2px] focus:outline-none text-zinc-900"
        aria-label="Close"
      >
        <LucideXCircle />
      </button>
    </div>
  );
};
