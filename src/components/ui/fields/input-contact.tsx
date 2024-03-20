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

type FieldContactProps = React.InputHTMLAttributes<HTMLInputElement> & {
  value: Contact;
  messageError?: string;
  isError?: boolean | string;
  isRequired?: boolean;
  onChange: (value: Contact) => void;
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

export const InputContact = React.forwardRef<
  HTMLInputElement,
  FieldContactProps
>(
  (
    { value, messageError, isError, isRequired, onChange, ...inputProps },
    ref
  ) => {
    const [typeValue, setTypeValue] = useState<Contact>(value);

    const handleSelectType = (value: string) => {
      console.log(value);
      setTypeValue((prev) => {
        const newValue = { ...prev, type: value };
        onChange && onChange(newValue);
        return newValue;
      });
    };

    const handleChangeValue = (event) => {
      setTypeValue((prev) => {
        const newValue = { ...prev, value: event.target.value };
        onChange && onChange(newValue);
        return newValue;
      });
    };

    return (
      <fieldset className="flex flex-col gap-1 w-full">
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
                <SelectTrigger placeholder="Selecione um tipo" />
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
              <Typography variant="formLabel">
                Contato - {typeValue.type}
              </Typography>
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
