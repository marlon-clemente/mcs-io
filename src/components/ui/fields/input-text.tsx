"use client";
import IMask from "imask";
import React, { ReactElement, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import Typography from "../typography";

type FieldTextProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  type?: "email" | "password" | "text";
  icon?: ReactElement;
  messageError?: string;
  isError?: boolean | string;
  isRequired?: boolean;
  sufix?: string;
  mask?: string;
  prefix?: string;
  fullWidth?: boolean;
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
      mask,
      fullWidth,
      ...inputProps
    },
    ref
  ) => {
    const inputRef = React.useRef(ref);

    useEffect(() => {
      if (mask && inputRef.current) {
        IMask(inputRef.current, {
          mask,
        });
      }
    }, [mask]);

    return (
      <fieldset className="flex w-auto flex-col gap-1">
        <label htmlFor={inputProps.name}>
          <Typography variant="formLabel">{label}</Typography>
          {isRequired && (
            <Typography variant="formLabel" className="text-red-500 mx-1">
              *
            </Typography>
          )}
        </label>
        <div
          className={twMerge(
            "flex w-auto items-center justify-center gap-2 rounded border border-zinc-300 px-3 py-1 shadow-sm outline-none",
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
            ref={inputRef}
            id={inputProps.name}
            {...inputProps}
            type={inputProps.type || "text"}
            className={twMerge(
              "flex-1 w-0 border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-600 outline-none focus:ring-0 "
            )}
          />
          {sufix && <span className="text-gray-800">{sufix}</span>}
        </div>
        {messageError && (
          <span className="text-red-500 text-[12px]">{messageError}</span>
        )}
      </fieldset>
    );
  }
);

InputText.displayName = "FiedText";
