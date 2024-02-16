import { LucideUser } from "lucide-react";
import Link from "next/link";
import React from "react";

const admin: React.FC = () => {
  return (
    <div>
      <Link href="/admin/users">
        <div className="bg-green-200 gap-2 flex rounded border items-center text-green-200 w-1/6 py-6 px-4 hover:cursor-pointer">
          <div className="bg-green-900 p-2 rounded-full">
            <LucideUser size={32} />
          </div>
          <span className="text-xl text-green-900 font-bold">Usuários</span>
        </div>
      </Link>
    </div>
  );
};

export default admin;
