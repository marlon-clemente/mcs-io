"use client";
import * as Form from "@radix-ui/react-form";
import React, {
  ForwardRefExoticComponent,
  ReactElement,
  RefAttributes,
} from "react";
import { twMerge } from "tailwind-merge";
import Typography from "../typography";

type FieldTextProps = Form.FormFieldProps &
  RefAttributes<HTMLInputElement> & {
    label: string;
    type?: "email" | "password" | "text";
    icon?: ReactElement;
    messageError?: string;
    isError?: boolean;
    isRequired?: boolean;
    sufix?: string;
  };

export const InputText: ForwardRefExoticComponent<FieldTextProps> =
  React.forwardRef((props, ref) => (
    <fieldset className="flex flex-col gap-1">
      <label form={props.name}>
        <Typography variant="formLabel">{props.label}</Typography>
        {props.isRequired && (
          <Typography variant="formLabel" className="text-red-500 mx-1">
            *
          </Typography>
        )}
      </label>
      <div
        className={twMerge(
          "flex w-full items-center justify-center gap-2 rounded border border-zinc-300 px-3 py-2 shadow-sm outline-none",
          props.messageError || props.isError
            ? "focus-within:ring-4 focus-within:ring-red-100"
            : "focus-within:ring-4 focus-within:ring-blue-100",
          props.messageError || props.isError
            ? "border-red-500"
            : "focus-within:border-[#6c88fc]"
        )}
      >
        {props.prefix && <span className="text-gray-800">{props.prefix}</span>}
        {props.icon && <span className="text-gray-500">{props.icon}</span>}
        <input
          ref={ref}
          id={props.name}
          type={props.type || "text"}
          {...props}
          className={twMerge(
            "flex-1 border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-600 outline-none focus:ring-0"
          )}
        />
        {props.sufix && <span className="text-gray-800">{props.sufix}</span>}
      </div>
      {props.messageError && (
        <span className="text-red-500">{props.messageError}</span>
      )}
    </fieldset>
  ));

InputText.displayName = "FiedText";
