"use client";
import React, { ReactElement } from "react";
import { twMerge } from "tailwind-merge";
import Typography from "../typography";

type FieldTextProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  type?: "email" | "password" | "text";
  icon?: ReactElement;
  messageError?: string;
  isError?: boolean;
  isRequired?: boolean;
  sufix?: string;
  prefix?: string;
};

export const InputText = React.forwardRef<HTMLInputElement, FieldTextProps>(
  (
    {
      label,
      messageError,
      isError,
      isRequired,
      sufix,
      icon,
      prefix,
      ...inputProps
    },
    ref
  ) => (
    <fieldset className="flex flex-col gap-1">
      <label form={inputProps.name}>
        <Typography variant="formLabel">{label}</Typography>
        {isRequired && (
          <Typography variant="formLabel" className="text-red-500 mx-1">
            *
          </Typography>
        )}
      </label>
      <div
        className={twMerge(
          "flex w-full items-center justify-center gap-2 rounded border border-zinc-300 px-3 py-2 shadow-sm outline-none",
          messageError || isError
            ? "focus-within:ring-4 focus-within:ring-red-100"
            : "focus-within:ring-4 focus-within:ring-blue-100",
          messageError || isError
            ? "border-red-500"
            : "focus-within:border-[#6c88fc]"
        )}
      >
        {prefix && <span className="text-gray-800">{prefix}</span>}
        {icon && <span className="text-gray-500">{icon}</span>}
        <input
          ref={ref}
          id={inputProps.name}
          type={inputProps.type || "text"}
          {...inputProps}
          className={twMerge(
            "flex-1 border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-600 outline-none focus:ring-0"
          )}
        />
        {sufix && <span className="text-gray-800">{sufix}</span>}
      </div>
      {messageError && <span className="text-red-500">{messageError}</span>}
    </fieldset>
  )
);

InputText.displayName = "FiedText";
