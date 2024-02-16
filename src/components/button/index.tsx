import React from "react";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      className="w-full rounded bg-[#6c88fc] h-10 text-white mt-3"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
