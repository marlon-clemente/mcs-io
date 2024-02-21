"use client";
import * as Form from "@radix-ui/react-form";
import React, {
  ForwardRefExoticComponent,
  ReactElement,
  RefAttributes,
} from "react";
import { twMerge } from "tailwind-merge";
import { Label } from "./Label";
import { Message } from "./Message";

type FieldTextProps = Form.FormFieldProps &
  RefAttributes<HTMLInputElement> & {
    label: string;
    icon?: ReactElement;
    messageError?: string;
  };

export const FieldText: ForwardRefExoticComponent<FieldTextProps> =
  React.forwardRef((props, ref) => (
    <Form.Field {...props} ref={ref} className="flex flex-col gap-1">
      <Label>{props.label}</Label>
      <div
        className={twMerge(
          "flex w-full items-center justify-center gap-2 rounded border border-zinc-300 px-3 py-2 shadow-sm outline-none",
          "focus-within:ring-4 focus-within:ring-blue-100 dark:focus-within:ring-blue-500/10",
          props.messageError
            ? "border-red-500"
            : "focus-within:border-[#6c88fc]"
        )}
      >
        {props.prefix && <span className="text-gray-800">{props.prefix}</span>}
        {props.icon && <span className="text-gray-500">{props.icon}</span>}
        <Form.Control asChild>
          <input
            className={twMerge(
              "flex-1 border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-600 outline-none focus:ring-0"
            )}
          />
        </Form.Control>
      </div>
      {props.messageError && <Message>{props.messageError}</Message>}
    </Form.Field>
  ));

FieldText.displayName = "FiedText";
