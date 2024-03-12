"use client";
import { CONTACT, Contact } from "@/types/contact";
import {
  LucideContact,
  LucideMail,
  LucideNavigation,
  LucidePhone,
} from "lucide-react";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Select, SelectContent, SelectItem, SelectTrigger } from ".";
import Typography from "../typography";

type FieldTextProps = React.InputHTMLAttributes<HTMLInputElement> & {
  value: Contact;
  messageError?: string;
  isError?: boolean | string;
  isRequired?: boolean;
};

interface IconProps {
  type: string;
}

const Icon: React.FC<IconProps> = ({ type }) => {
  switch (type) {
    case "email":
      return <LucideMail />;
    case "phone":
      return <LucidePhone />;
    case "whatsapp":
      return <LucidePhone />;
    case "website":
      return <LucideNavigation />;
    case "emailXML":
      return <LucideMail />;
    default:
      return <LucideContact />;
  }
};

export const InputContact = React.forwardRef<HTMLInputElement, FieldTextProps>(
  ({ value, messageError, isError, isRequired, ...inputProps }, ref) => {
    const [typeValue, setTypeValue] = useState<Contact>(value);

    const handleSelectType = (value: string) => {
      console.log(value);
      setTypeValue((prev) => ({ ...prev, type: value }));
    };

    const handleChangeValue = (event) => {
      setTypeValue((prev) => ({ ...prev, value: event.target.value }));
    };

    return (
      <fieldset className="flex flex-col gap-1">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor={inputProps.name}>
              <Typography variant="formLabel">Tipo de contato</Typography>
              {isRequired && (
                <Typography variant="formLabel" className="text-red-500 mx-1">
                  *
                </Typography>
              )}
            </label>
            <div className="w-full col-span-1">
              <Select onValueChange={handleSelectType}>
                <SelectTrigger />
                <SelectContent className="w-auto">
                  {CONTACT.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="col-span-2">
            <label htmlFor={inputProps.name}>
              <Typography variant="formLabel">Tipo de contato</Typography>
              {isRequired && (
                <Typography variant="formLabel" className="text-red-500 mx-1">
                  *
                </Typography>
              )}
            </label>
            <div
              className={twMerge(
                "flex w-full items-center justify-center gap-2 rounded border border-zinc-300 px-3 py-1 shadow-sm outline-none",
                messageError || isError
                  ? "focus-within:ring-4 focus-within:ring-red-100"
                  : "focus-within:ring-4 focus-within:ring-blue-100",
                messageError || isError
                  ? "border-red-500"
                  : "focus-within:border-[#6c88fc]"
              )}
            >
              {/* <span className="text-gray-600">
                <Icon type={typeValue.type || "email"} />
              </span> */}
              <input
                ref={ref}
                id={inputProps.name}
                type={inputProps.type || "text"}
                {...inputProps}
                onChange={handleChangeValue}
                className={twMerge(
                  "flex-1 border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-600 outline-none focus:ring-0 "
                )}
              />
            </div>
          </div>
        </div>
        {messageError && (
          <span className="text-red-500 text-[12px]">{messageError}</span>
        )}
      </fieldset>
    );
  }
);

InputContact.displayName = "InputContact";
